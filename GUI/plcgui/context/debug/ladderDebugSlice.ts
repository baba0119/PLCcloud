import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ladderRecordDataModel } from "../../model/ladderDataModel";
import { ioStateSetModel } from "../../model/ladderDebugContextModel";
import { point } from "../../model/ladderDisplayContextModel";
import { pointSelect } from "../create/reducers/pointSelect";
import { ioStateModel, ladderDebugInitialState } from "../ladderEntity/ladderInitialState";

export const ladderDebugSlice = createSlice({
  name: 'ladderDebug',
  initialState: ladderDebugInitialState,
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
    // ラダープログラムの置換
    ladderSet: (state, action: PayloadAction<ladderRecordDataModel[]>) => {
      state.ladderRecordData = action.payload;

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
    // 入出力のスライスをセットする
    ioStateSet: (state, action: PayloadAction<ioStateSetModel>) => {
      if ( action.payload.ioType === "input" ) {
        state.inputState = action.payload.ioList;
      } else {
        state.outputState = action.payload.ioList;
      }

      return state;
    }
  }
})