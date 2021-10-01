// uuidを生成する関数のインポート
import { getUniqueStr} from '../infrastructure/uuid';

import { ladderDataModel } from './ladderDataModel';

const ladderInitialStateNode: ladderDataModel = {
  id: getUniqueStr(),
  isProof: false,
  colState: {
    isUpCol: false,
    isDownCol: false,
  },
  ladderNode: {
    name: "",
    info: "",
    attr: "",
    attrInfo: null
  }
}

const ladderInitialStateRecord: ladderDataModel[] = [
  ladderInitialStateNode, // 1
  ladderInitialStateNode, // 2
  ladderInitialStateNode, // 3
  ladderInitialStateNode, // 4
  ladderInitialStateNode, // 5
  ladderInitialStateNode, // 6
  ladderInitialStateNode, // 7
  ladderInitialStateNode, // 8
  ladderInitialStateNode, // 9
  ladderInitialStateNode, // 10
]

export const ladderInitialState: ladderDataModel[][] = [
  ladderInitialStateRecord, // 1
  ladderInitialStateRecord, // 2
  ladderInitialStateRecord, // 3
  ladderInitialStateRecord, // 4
  ladderInitialStateRecord, // 5
  ladderInitialStateRecord, // 6
  ladderInitialStateRecord, // 7
  ladderInitialStateRecord, // 8
  ladderInitialStateRecord, // 9
  ladderInitialStateRecord, // 10
  ladderInitialStateRecord  // 11
];