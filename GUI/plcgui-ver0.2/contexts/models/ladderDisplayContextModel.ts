import { createContext } from 'react';
import { colPatternModel, colSettingModel } from '../../model/colPatternModel';
import { KindsModel, ladderRecordDataModel } from '../../model/ladderDataModel';
import { ladderCreatetDisplayModel, point } from "../../model/ladderStateModel";

// contextの型
type ladderDisplayContextModel = {
  // 状態
  displayState: ladderCreatetDisplayModel;
  // 操作
  pointSelect: (point: point) => void;
  nodeUpdateFunc: (kinds: KindsModel) => void;
  colUpDateFunc: (colPattern: colPatternModel) => void;
  colSettingFunc: (colSettingInfo: colSettingModel) => void;
  nodeNameUpdateFunc: (name: string) => void;
  nodeDeleteFunc: () => void;
  ladderSetFunc: (displayData: ladderRecordDataModel[]) => void;
  ioKindChangeFunc: (kind: string) => void;
  modeChangeFunc: () => void;
}

export const LadderDisplayContext = createContext<ladderDisplayContextModel>(
  {} as ladderDisplayContextModel
);