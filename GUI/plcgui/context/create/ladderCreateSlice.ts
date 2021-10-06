import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ladderDisplayInitialState } from "../ladderEntity/ladderInitialState";
import { point } from "./ladderDisplayContext/ladderContextModel";
import { getUniqueStr } from "../../utils/uuid";

export const ladderCreateSlice = createSlice({
  name: 'ladderDisplay',
  initialState: ladderDisplayInitialState,
  reducers: {
    pointSelecter: (state, action: PayloadAction<point>) => {
      const x = action.payload.x;
      const y = action.payload.y;
      // 取得座標確認用
      console.log(x, y);

      // 状態(isChoice)の変更
      let record = state.ladderRecordData[y];
      let node = record.ladderData[x];
      record.ladderData.splice(x, 1, {
        id: getUniqueStr(),
        isProof: node.isProof,
        isChoice: true,
        colState: node.colState,
        ladderNode: node.ladderNode
      });
      state.ladderRecordData[y] = record

      const beforeX = state.point.x;
      const beforeY = state.point.y;

      record = state.ladderRecordData[beforeY];
      node = record.ladderData[beforeX];
      record.ladderData.splice(beforeX, 1, {
        id: getUniqueStr(),
        isProof: node.isProof,
        isChoice: false,
        colState: node.colState,
        ladderNode: node.ladderNode
      });
      state.ladderRecordData[beforeY] = record

      state.point.x = x;
      state.point.y = y;

      return state
    }
  }
});
