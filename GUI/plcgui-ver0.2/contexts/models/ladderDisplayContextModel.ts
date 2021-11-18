import { createContext } from 'react';
import { ladderCreatetDisplayModel, point } from "../../model/ladderStateModel";

// contextの型
type ladderDisplayContextModel = {
  // 状態
  displayState: ladderCreatetDisplayModel;
  // 操作
  pointSelect: (point: point) => void;
}

export const LadderDisplayContext = createContext<ladderDisplayContextModel>(
  {} as ladderDisplayContextModel
);