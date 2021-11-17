import { ladderCreateActions } from "../model/ladderCreateActions";
import { ladderCreatetDisplayModel } from "../model/ladderStateModel";
import { colSetting } from "./utils/colSetting";
import { pointSelect } from "./utils/pointSelect";

export const ladderDisplayReducer = (
  state: ladderCreatetDisplayModel,
  action: ladderCreateActions
): ladderCreatetDisplayModel => {
  switch ( action.type ) {
    case "pointSelect": {
      state.point.x = action.payload.x;
      state.point.y = action.payload.y;
      const newState = { ...state }

      return newState;
    }
    case "nodeUpdate": {
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
        state.point.x = x+1;
        state.point.y = y;
      } else {
        state.point.x = 0;
        state.point.y = y + 1;
      }
      return state;
    }
    case "nodeNameUpdate": {
      const x = state.point.x;
      const y = state.point.y;

      state.ladderRecordData[y].ladderData[x].ladderNode.name = action.payload;

      return state;
    }
    case "nodeDelete": {
      const x = state.point.x;
      const y = state.point.y;

      state.ladderRecordData[y].ladderData[x].ladderNode.name = "";
      state.ladderRecordData[y].ladderData[x].ladderNode.info = "";
      state.ladderRecordData[y].ladderData[x].ladderNode.attr = "";
      state.ladderRecordData[y].ladderData[x].ladderNode.attrInfo = null;
      state.ladderRecordData[y].ladderData[x].isProof = false;

      return state;
    }
    case "colUpdate": {
      return colSetting(state, {
        colPattern: action.payload,
        isCol: true
      });
    }
    case "colSetting": {
      return colSetting(state, action.payload);
    }
    case "ladderSave": {
      console.log("ラダープログラム保存");
      return state;
    }
    case "modeChange": {
      if ( state.mode === "debug" ) {
        state.mode = "create";
      } else if ( state.mode === "create" ) {
        state.mode = "debug";
      }
      return state;
    }
  }
}