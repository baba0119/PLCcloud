import { colSettingModel } from "../../model/colPatternModel";


export const colSetting = (state: any, action: colSettingModel) => {
  const x = state.point.x;
  const y = state.point.y;
  const isColState = action.isCol;

  // 入力パターン
  // around: "right" | "left" | "both";
  // col: "up" | "low";
  switch ( action.colPattern.around ) {
    case "right": {
      switch ( action.colPattern.col ) {
        case "up" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isUpCol = isColState;
          state.
          ladderRecordData[y-1].
          ladderData[x].colState.isDownCol = isColState;

          break
        }
        case "low" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isDownCol = isColState;
          state.
          ladderRecordData[y+1].
          ladderData[x].colState.isUpCol = isColState;

          break
        }
      }

      break;
    }
    case "left": {
      switch ( action.colPattern.col ) {
        case "up" : {
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isUpCol = isColState;
          state.
          ladderRecordData[y-1].
          ladderData[x-1].colState.isDownCol = isColState;

          break
        }
        case "low" : {
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isDownCol = isColState;
          state.
          ladderRecordData[y+1].
          ladderData[x-1].colState.isUpCol = isColState;

          break
        }
      }

      break;
    }
    case "both": {
      switch ( action.colPattern.col ) {
        case "up" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isUpCol = isColState;
          state.
          ladderRecordData[y-1].
          ladderData[x].colState.isDownCol = isColState;
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isUpCol = isColState;
          state.
          ladderRecordData[y-1].
          ladderData[x-1].colState.isDownCol = isColState;

          break
        }
        case "low" : {
          state.
          ladderRecordData[y].
          ladderData[x].colState.isDownCol = isColState
          state.
          ladderRecordData[y+1].
          ladderData[x].colState.isUpCol = isColState;
          state.
          ladderRecordData[y].
          ladderData[x-1].colState.isDownCol = isColState;
          state.
          ladderRecordData[y+1].
          ladderData[x-1].colState.isUpCol = isColState;

          break;
        }
      }

      break;
    }
  }

  return state
}