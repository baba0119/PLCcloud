import { ladderCreatetDisplayModel, point } from '../../model/ladderStateModel';

export const pointSelect = (
  state: ladderCreatetDisplayModel,
  point: point
): ladderCreatetDisplayModel => {
  const x = point.x;
  const y = point.y;

  const beforeX = state.point.x;
  const beforeY = state.point.y;

  // 状態(isChoice)の変更
  state.ladderRecordData[y].ladderData[x].isChoice = true;

  if ( beforeX === x && beforeY === y ) {
    return state;
  }

  state.ladderRecordData[beforeY].ladderData[beforeX].isChoice = false;

  state.point.x = x;
  state.point.y = y;

  console.log(
    state.ladderRecordData[y].ladderData[x].isChoice,
    x,
    y
  );
  console.log(
    state.ladderRecordData[beforeY].ladderData[beforeX].isChoice,
    beforeX,
    beforeY
  );
  console.log(state);
  return state;
}

// // 状態(isChoice)の変更
// let record = state.ladderRecordData[y];
// let node = record.ladderData[x];

// record.ladderData.splice(x, 1, {
//   id: uuidv4(),
//   isProof: node.isProof,
//   isChoice: true,
//   colState: node.colState,
//   ladderNode: node.ladderNode
// });
// state.ladderRecordData[y] = record;

// if ( beforeX === x && beforeY === y ) {
//   return state;
// }

// record = state.ladderRecordData[beforeY];
// node = record.ladderData[beforeX];

// record.ladderData.splice(beforeX, 1, {
//   id: uuidv4(),
//   isProof: node.isProof,
//   isChoice: false,
//   colState: node.colState,
//   ladderNode: node.ladderNode
// });
// state.ladderRecordData[beforeY] = record;