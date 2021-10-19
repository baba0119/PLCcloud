import { createContext } from 'react';
import { ladderDisplayInitialStateModel } from '../context/ladderEntity/ladderInitialState';
import { ladderRecordDataModel } from './ladderDataModel';

// 座標を取り扱う型
export type point = {
  x: number;
  y: number;
}

// 座標指定のアクションの型
export type ladderDisplayActionModel = {
  pointSelect: (point: point) => void;
  ladderSet:(displayData: ladderRecordDataModel[]) => void;
}

// contextの型
type ladderDisplayContextModel = {
  // 状態
  displayState: ladderDisplayInitialStateModel;
  // 操作
  ladderDisplayAction: ladderDisplayActionModel;
}

export const ladderDisplayContext = createContext<ladderDisplayContextModel>({} as ladderDisplayContextModel);