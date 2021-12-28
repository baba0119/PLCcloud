import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { colPatternModel, colSettingModel } from "../model/colPatternModel";
import { KindsModel, ladderRecordDataModel } from "../model/ladderDataModel";
import { ioStateModel, point } from "../model/ladderStateModel";
import { END_POINT } from "../utils/endpoint";
import { ladderCreateDisplayInitialState } from "./initialState/ladderCreateDisplay";
import { colSetting } from "./utils/colSetting";
import { pointSelect } from "./utils/pointSelect";

export const ladderCreateDisplaySlice = createSlice({
  name: 'ladderDisplay',
  initialState: ladderCreateDisplayInitialState,
  reducers: {
    // 座標の状態に関わる処理
    pointSelecter: (state, action: PayloadAction<point>) => {
      const x = action.payload.x;
      const y = action.payload.y;
      // 取得座標確認用
      console.log(x, y);

      // x, y の座標を選択する
      return pointSelect(state, {x: x, y: y});
    },
    // ノードの設定
    nodeUpdate: (state, action: PayloadAction<KindsModel>) => {
      // 座標の指定 (relayの場合一番右)
      if ( action.payload === "vrio" || action.payload === "gpio" ) {
        state = pointSelect(state, {x: 9, y: state.point.y});
      }

      const x = state.point.x;
      const y = state.point.y;

      // ノード情報を変更
      state.
      ladderRecordData[y].
      ladderData[x].ladderNode.info = action.payload;
      state.
      ladderRecordData[y].
      ladderData[x].isProof = true;

      console.log(action.payload);
      if ( x < 9 ) {
        state = pointSelect(state, {x: x+1, y: y})
      } else {
        state = pointSelect(state, {x: 0, y: y+1})
      }

      return state;
    },
    // 縦列接続の設定
    colUpdate: (state, action: PayloadAction<colPatternModel>) => {
      return colSetting(state, {
        colPattern: action.payload,
        isCol: true
      });
    },
    // node name の変更
    nodeNameUpdate: (state, action: PayloadAction<string>) => {
      const x = state.point.x;
      const y = state.point.y;

      state.ladderRecordData[y].ladderData[x].ladderNode.name = action.payload;

      return state;
    },
    // 接点の接続の詳細設定
    colSetting: (state, action: PayloadAction<colSettingModel>) => {
      return colSetting(state, action.payload)
    },
    // 接点の削除
    nodeDelete: (state) => {
      const x = state.point.x;
      const y = state.point.y;

      state.ladderRecordData[y].ladderData[x].ladderNode.name = "";
      state.ladderRecordData[y].ladderData[x].ladderNode.info = "";
      state.ladderRecordData[y].ladderData[x].ladderNode.attr = "";
      state.ladderRecordData[y].ladderData[x].ladderNode.attrInfo = null;
      state.ladderRecordData[y].ladderData[x].isProof = false;

      return state;
    },
    ladderSet: (state, action: PayloadAction<ladderRecordDataModel[]>) => {
      state.ladderRecordData = action.payload as ladderRecordDataModel[];

      state.point.x = 0;
      state.point.y = 0;

      state.ladderRecordData.map((record, yIndex) => {
        record.ladderData.map((node, xIndex) => {
          if ( node.isChoice ) {
            state.ladderRecordData[yIndex].ladderData[xIndex].isChoice = false;
          }
        })
      })
      state.ladderRecordData[0].ladderData[0].isChoice = true;

      return state;
    },
    ioKindChange: (state, action: PayloadAction<string>) => {
      const x = state.point.x;
      const y = state.point.y;

      const nowIoKind = state.ladderRecordData[y].ladderData[x].ladderNode.info;

      if ( action.payload === "gpio" ) {
        switch ( nowIoKind ) {
          case "vrA": {
            state.ladderRecordData[y].ladderData[x].ladderNode.info = "gpA";
            break;
          }
          case "vrB": {
            state.ladderRecordData[y].ladderData[x].ladderNode.info = "gpB";
            break;
          }
          case "vrio": {
            state.ladderRecordData[y].ladderData[x].ladderNode.info = "gpio";
            break;
          }
        }
      } else
      if ( action.payload === "vrio" ) {
        switch ( nowIoKind ) {
          case "gpA": {
            state.ladderRecordData[y].ladderData[x].ladderNode.info = "vrA";
            break;
          }
          case "gpB": {
            state.ladderRecordData[y].ladderData[x].ladderNode.info = "vrB";
            break;
          }
          case "gpio": {
            state.ladderRecordData[y].ladderData[x].ladderNode.info = "vrio";
            break;
          }
        }
      }

      return state;
    },
    modeChange: (state) => {
      if (state.mode === "create") {
        state.mode = "debug";
        const inputList: ioStateModel[] = [];
        const outputList: ioStateModel[] = [];
        const ladder = state.ladderRecordData;

        ladder.map(record => {
          record.ladderData.map(node => {
            const info = node.ladderNode.info;
            if ( info === "gpA" || info === "gpB" ) {
              inputList.push({
                nodeName: node.ladderNode.name,
                ioState: false
              })
            } else if ( info === "vrio" || info === "gpio" ) {
              outputList.push({
                nodeName: node.ladderNode.name,
                ioState: false
              })
            }
          })
        })

        state.inputState = inputList;
        state.outputState = outputList;
      } else {
        state.mode = "create";
      }

      return state;
    },
    ladderInit: (state) => {
      type ProjectReqFlame = {
        token: string
        userid: string
        projectid: string
      }
      const ladderGetReq: ProjectReqFlame = {
        token: sessionStorage.getItem("token") as string,
        userid: sessionStorage.getItem("userid") as string,
        projectid: sessionStorage.getItem("projectid") as string
      }

      const endpoint = END_POINT + "/ladder"
      fetch(endpoint, {
        method: "POST",
        mode: "cors",
        credentials: 'include',
        body: JSON.stringify(ladderGetReq),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (!res.ok) {
          console.log("サーバーエラー");
          return
        }
        return res.text()
      }).then(res => {
        console.log(typeof res, res)
        sessionStorage.setItem("ld", res as string)
      }).catch(error => {
        console.log("通信失敗", error);
      })

      const ld = sessionStorage.getItem("ld");
      if (ld != "null") {
        console.log("true")
        state.ladderRecordData = JSON.parse(ld as string);
      }
      return state
    },
    ladderSave: (state) => {
      type saveReqFlame = {
        token: string
        userid: string
        projectid: string
        ladder: any
      }
      const saveReq: saveReqFlame = {
        token: sessionStorage.getItem("token") as string,
        userid: sessionStorage.getItem("userid") as string,
        projectid: sessionStorage.getItem("projectid") as string,
        ladder: state.ladderRecordData
      }
      const endpoint = END_POINT + "/ladder"
      fetch(endpoint, {
        method: "PUT",
        mode: "cors",
        credentials: 'include',
        body: JSON.stringify(saveReq),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (!res.ok) {
          console.log("サーバーエラー");
          return
        }
        return res.text()
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log("通信失敗");
      })

      const ld = JSON.stringify(state.ladderRecordData);
      sessionStorage.setItem("ld", ld);
      return state
    },
    inputControl: (state, action: PayloadAction<string>) => {
      // 型定義
      type StateListFlame = {
        nodeName: string
        state: boolean
        nodeType?: string
      }
      type ioFlame = {
        stateList: StateListFlame[]
        elementCount: number
      }
      type debugReqFlame = {
        input: ioFlame
        output: ioFlame
        ladder: ladderRecordDataModel[]
      }

      // 入力の変更

      // 状態からリクエストデータの作成

      // apiを叩く(出力の変更)
    }
  }
});