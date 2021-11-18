import { v4 as uuidv4 } from 'uuid';
import { ladderCreatetDisplayModel } from '../../model/ladderStateModel';
import { ladderRecordDataModel } from '../../model/ladderDataModel';
import { ladderDataModel } from '../../model/ladderDataModel';

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

const ladderInitialState: ladderRecordDataModel[] = [];

for ( let i:number = 0; i < 11; i++ ) {
  ladderInitialState.push({
    id: uuidv4(),
    ladderData: ladderInitialStateRecord
  });
}

export const ladderCreateDisplayInitialState: ladderCreatetDisplayModel = {
  ladderRecordData: ladderInitialState,
  point: { x: 0, y: 0 },
  mode: "create",
  isSave: true
}