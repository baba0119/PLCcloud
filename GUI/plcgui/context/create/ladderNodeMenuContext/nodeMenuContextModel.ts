import { createContext } from 'react';
import { KindsModel } from '../../ladderEntity/ladderDataModel';

// 縦列接続のパターン
export type colPatternModel = {
  around: "right" | "left" | "both";
  col: "up" | "low";
}

// ラダープログラムへの変更を行うアクションの型
// アクションしかないのでこれが context の型となる
export type ladderUpdateActionModel = {
  nodeUpdate: (kinds: KindsModel) => void;
  colUpdate: (colPattern: colPatternModel) => void;
}

export const NodeMenuContext = createContext<ladderUpdateActionModel>({} as ladderUpdateActionModel)