import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { colPatternModel, colSettingModel } from "../model/colPatternModel";
import { KindsModel, ladderRecordDataModel } from "../model/ladderDataModel";
import { point } from "../model/ladderStateModel";
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
    }
  }
});