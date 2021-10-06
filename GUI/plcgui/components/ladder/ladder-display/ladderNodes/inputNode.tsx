import { VFC } from 'react';
import { colStateModel } from '../../../../context/create/ladderDataModel';
import {
  NodeParentStyle,
  NodeSelectStyle,
  LadderNodePrint,
  LadderConnection,
  LadderConnectionLineDown,
  LadderConnectionLineUp
} from './nodeStyle';

//
// 入力ノードの表示
//
type Props = {
  id: string
  colState: colStateModel
  isChoice: boolean
  x: number
  y: number
}
const InputNode: VFC<Props> = ({
  id,
  colState,
  isChoice,
  x,
  y
}) => {

  return (
    <NodeParentStyle key={id}>
      <NodeSelectStyle isChoice={isChoice}/>
      <LadderNodePrint></LadderNodePrint>
      <LadderConnection>
        <LadderConnectionLineUp conn={colState.isUpCol}/>
        <LadderConnectionLineDown conn={colState.isDownCol}/>
      </LadderConnection>
    </NodeParentStyle>
  );
}

export default InputNode