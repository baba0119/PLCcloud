import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ladderRecordDataModel } from "../../model/ladderDataModel";
import { point } from "../../model/ladderDisplayContextModel";
import { pointSelect } from "../create/reducers/pointSelect";
import { ladderDebugInitialState } from "../ladderEntity/ladderInitialState";

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
    }
  }
})