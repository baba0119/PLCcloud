import { PayloadAction } from "@reduxjs/toolkit";
import { colPatternModel } from "../../../model/nodeMenuContextModel";

export const colStateSet = (state: any, action: PayloadAction<colPatternModel>) => {
  const x = state.point.x;
  const y = state.point.y;

  // 入力パターン
  // around: "right" | "left" | "both";
  // col: "up" | "low";
  switch ( action.payload.around ) {
    case "right": {
      switch ( action.payload.col ) {
        case "up" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isUpCol = true;
          state.
          ladderRecordData[y-1].
          ladderData[x].colState.isDownCol = true;

          break
        }
        case "low" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isDownCol = true;
          state.
          ladderRecordData[y+1].
          ladderData[x].colState.isUpCol = true;

          break
        }
      }

      break;
    }
    case "left": {
      switch ( action.payload.col ) {
        case "up" : {
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isUpCol = true;
          state.
          ladderRecordData[y-1].
          ladderData[x-1].colState.isDownCol = true;

          break
        }
        case "low" : {
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isDownCol = true;
          state.
          ladderRecordData[y+1].
          ladderData[x-1].colState.isUpCol = true;

          break
        }
      }

      break;
    }
    case "both": {
      switch ( action.payload.col ) {
        case "up" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isUpCol = true;
          state.
          ladderRecordData[y-1].
          ladderData[x].colState.isDownCol = true;
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isUpCol = true;
          state.
          ladderRecordData[y-1].
          ladderData[x-1].colState.isDownCol = true;

          break
        }
        case "low" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isDownCol = true
          state.
          ladderRecordData[y+1].
          ladderData[x].colState.isUpCol = true;
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isDownCol = true;
          state.
          ladderRecordData[y+1].
          ladderData[x-1].colState.isUpCol = true;

          break;
        }
      }

      break;
    }
  }

  return state
}