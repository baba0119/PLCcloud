import { useContext, VFC } from 'react';
import { ladderDisplayContext } from '../../../../context/create/ladderDisplayContext/ladderContextModel';
import { colStateModel, ladderDataModel } from '../../../../context/ladderEntity/ladderDataModel';
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
  nodeData: ladderDataModel
  x: number
  y: number
}
const OutputNode: VFC<Props> = ({
  id,
  colState,
  isChoice,
  nodeData,
  x,
  y
}) => {
  const { pointSelecter } = useContext(ladderDisplayContext);

  return (
    <NodeParentStyle
      key={id}
      onClick={() => pointSelecter.pointSelect({x: x, y: y})}
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

export default OutputNode