import { point } from "../../../model/ladderDisplayContextModel";
import { v4 as uuidv4 } from 'uuid';

export const pointSelect = (state: any, point: point) => {
  const x = point.x;
  const y = point.y;

  // 状態(isChoice)の変更
  let record = state.ladderRecordData[y];
  let node = record.ladderData[x];
  record.ladderData.splice(x, 1, {
    id: uuidv4(),
    isProof: node.isProof,
    isChoice: true,
    colState: node.colState,
    ladderNode: node.ladderNode
  });
  state.ladderRecordData[y] = record;

  const beforeX = state.point.x;
  const beforeY = state.point.y;

  if ( beforeX === x && beforeY === y ) {
    return state;
  }

  record = state.ladderRecordData[beforeY];
  node = record.ladderData[beforeX];
  record.ladderData.splice(beforeX, 1, {
    id: uuidv4(),
    isProof: node.isProof,
    isChoice: false,
    colState: node.colState,
    ladderNode: node.ladderNode
  });
  state.ladderRecordData[beforeY] = record;

  state.point.x = x;
  state.point.y = y;

  return state;
}