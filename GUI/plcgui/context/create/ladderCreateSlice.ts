import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ladderDisplayInitialState } from "../ladderEntity/ladderInitialState";
import { point } from "../../model/ladderDisplayContextModel";
import { KindsModel } from "../../model/ladderDataModel";
import { colPatternModel } from "../../model/nodeMenuContextModel";
import { pointSelect } from "./reducers/pointSelect";
import { colStateSet } from "./reducers/colStateSet";

export const ladderCreateSlice = createSlice({
  name: 'ladderDisplay',
  initialState: ladderDisplayInitialState,
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
      console.log("nodeUpdate", action.payload);

      // 座標の指定 (relayの場合一番右)
      if ( action.payload === "relay" ) {
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
      console.log("colUpdate", action.payload);

      return colStateSet(state, action);
    }
  }
});
