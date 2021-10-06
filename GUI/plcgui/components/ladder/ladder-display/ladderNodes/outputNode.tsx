import { useContext, VFC } from 'react';
import { ladderDisplayContext } from '../../../../context/create/ladderDisplayContext/ladderContextModel';
import { colStateModel, ladderNodeModel } from '../../../../context/ladderEntity/ladderDataModel';
import {
  NodeParentStyle,
  NodeSelectStyle,
  LadderNodePrint,
  LadderConnection,
  LadderConnectionLineDown,
  LadderConnectionLineUp
} from './nodeStyle';
import NomalOutput from './outputKinds/nomalOutput';

//
// 出力ノードの表示
//
type Props = {
  id: string
  colState: colStateModel
  isChoice: boolean
  nodeData: ladderNodeModel
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
      <LadderNodePrint>
        <NomalOutput name={nodeData.name}/>
      </LadderNodePrint>
      <LadderConnection>
        <LadderConnectionLineUp conn={colState.isUpCol}/>
        <LadderConnectionLineDown conn={colState.isDownCol}/>
      </LadderConnection>
    </NodeParentStyle>
  );
}

export default OutputNode