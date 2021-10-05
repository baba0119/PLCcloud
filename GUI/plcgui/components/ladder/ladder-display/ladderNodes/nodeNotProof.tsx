import { VFC } from 'react';
import { colStateModel } from '../../../../context/create/ladderDataModel';
import {
  NodeParentStyle,
  LadderNodePrint,
  LadderConnection,
  LadderConnectionLineDown,
  LadderConnectionLineUp
} from './nodeStyle';

//
// 何もノードがないときの表示
//
type Props = {
  id: string
  colState: colStateModel
}
const NodeNotProof: VFC<Props> = ({id, colState}) => {
  return (
    <NodeParentStyle key={id}>
      <LadderNodePrint></LadderNodePrint>
      <LadderConnection>
        <LadderConnectionLineUp conn={colState.isUpCol}/>
        <LadderConnectionLineDown conn={colState.isDownCol}/>
      </LadderConnection>
    </NodeParentStyle>
  );
}

export default NodeNotProof