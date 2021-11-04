import { useContext, VFC } from 'react';
import { ladderDisplayContext } from '../../../../model/ladderDisplayContextModel';
import { colStateModel } from '../../../../model/ladderDataModel';
import {
  NodeParentStyle,
  NodeSelectStyle,
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
  isChoice: boolean
  x: number
  y: number
}
const NodeNotProof: VFC<Props> = ({
  id,
  colState,
  isChoice,
  x,
  y
}) => {
  const { ladderDisplayAction } = useContext(ladderDisplayContext);

  return (
    <NodeParentStyle
      key={id}
      onClick={() => ladderDisplayAction.pointSelect({x: x, y: y})}
    >
      <NodeSelectStyle isChoice={isChoice}/>
      <LadderNodePrint></LadderNodePrint>
      <LadderConnection>
        <LadderConnectionLineUp conn={colState.isUpCol}/>
        <LadderConnectionLineDown conn={colState.isDownCol}/>
      </LadderConnection>
    </NodeParentStyle>
  );
}

export default NodeNotProof