import { createContext } from 'react';
import { colPatternModel } from './nodeMenuContextModel';

// type colPatternModel = {
//   around: "right" | "left" | "both";
//   col: "up" | "low";
// }
export type colSettingModel = {
  colPattern: colPatternModel;
  isCol: boolean;
}

// ラダープログラムの各接点の設定を行う
export type nodeInfoUpdateModel = {
  nameChange: (name: string) => void;
  colSetting: (colSettingInfo: colSettingModel) => void;
}

export const NodeInfoContext = createContext<nodeInfoUpdateModel>({} as nodeInfoUpdateModel)