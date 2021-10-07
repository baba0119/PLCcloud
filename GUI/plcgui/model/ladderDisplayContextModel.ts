import { createContext } from 'react';
import { ladderDisplayInitialStateModel } from '../context/ladderEntity/ladderInitialState';

// 座標を取り扱う型
export type point = {
  x: number;
  y: number;
}

// 座標指定のアクションの型
export type pointSelectActionModel = {
  pointSelect: (point: point) => void;
}

// contextの型
type ladderDisplayContextModel = {
  // 状態
  displayState: ladderDisplayInitialStateModel;
  // 操作
  pointSelecter: pointSelectActionModel;
}

export const ladderDisplayContext = createContext<ladderDisplayContextModel>({} as ladderDisplayContextModel);