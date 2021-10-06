// uuidを生成する関数のインポート
import { v4 as uuidv4 } from 'uuid';
import { point } from '../create/ladderDisplayContext/ladderContextModel';

import { ladderRecordDataModel } from './ladderDataModel';
import { ladderDataModel } from './ladderDataModel';

const ladderInitialStateRecord: ladderDataModel[] = []

for ( let i: number = 0; i < 10; i++ ) {
  ladderInitialStateRecord.push({
    id: uuidv4(),
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
  });
}

export const ladderInitialState: ladderRecordDataModel[] = [];

for ( let i:number = 0; i < 11; i++ ) {
  ladderInitialState.push({
    id: uuidv4(),
    ladderData: ladderInitialStateRecord
  });
}

export type ladderDisplayInitialStateModel = {
  ladderRecordData: ladderRecordDataModel[];
  point: point;
}

export const ladderDisplayInitialState: ladderDisplayInitialStateModel = {
  ladderRecordData: ladderInitialState,
  point: { x: 0, y: 0 }
}