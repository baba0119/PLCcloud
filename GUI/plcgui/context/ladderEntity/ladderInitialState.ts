// uuidを生成する関数のインポート
import { getUniqueStr} from '../../utils/uuid';
import { point } from '../create/ladderDisplayContext/ladderContextModel';

import { ladderRecordDataModel } from './ladderDataModel';
import { ladderDataModel } from './ladderDataModel';

const ladderInitialStateNode: ladderDataModel = {
  id: getUniqueStr(),
  isProof: false,
  isChoice: false,
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

export const ladderRecordData: ladderRecordDataModel = {
  id: getUniqueStr(),
  ladderData: ladderInitialStateRecord
}

export const ladderInitialState: ladderRecordDataModel[] = [
  ladderRecordData, // 1
  ladderRecordData, // 2
  ladderRecordData, // 3
  ladderRecordData, // 4
  ladderRecordData, // 5
  ladderRecordData, // 6
  ladderRecordData, // 7
  ladderRecordData, // 8
  ladderRecordData, // 9
  ladderRecordData, // 10
  ladderRecordData  // 11
];

export type ladderDisplayInitialStateModel = {
  ladderRecordData: ladderRecordDataModel[];
  point: point;
}

export const ladderDisplayInitialState: ladderDisplayInitialStateModel = {
  ladderRecordData: ladderInitialState,
  point: { x: 0, y: 0 }
}