import { colPatternModel, colSettingModel } from "./colPatternModel";
import { KindsModel } from "./ladderDataModel";
import { point } from "./ladderStateModel";

export type ladderCreateActions =
  | {
    type: "pointSelect"
    payload: point
  }
  | {
    type: "nodeUpdate"
    payload: KindsModel
  }
  | {
    type: "nodeNameUpdate"
    payload: string
  }
  | {
    type: "nodeDelete"
  }
  | {
    type: "colUpdate"
    payload: colPatternModel
  }
  | {
    type: "colSetting"
    payload: colSettingModel
  }
  | {
    type: "ladderSave"
  }
  | {
    type: "modeChange"
  }
