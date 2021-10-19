import { useContext, VFC } from 'react';
import { ladderDisplayContext } from '../../../../model/ladderDisplayContextModel';
import { colStateModel, ladderNodeModel } from '../../../../model/ladderDataModel';
import NomalInput from './inputKinds/nomalInput';
// スタイルの読み込み
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
  nodeData: ladderNodeModel
  x: number
  y: number
}
const InputNode: VFC<Props> = ({
  id,
  colState,
  isChoice,
  nodeData,
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
      <LadderNodePrint>
        <NomalInput
          name={nodeData.name}
          kinds={nodeData.info}
        />
      </LadderNodePrint>
      <LadderConnection>
        <LadderConnectionLineUp conn={colState.isUpCol}/>
        <LadderConnectionLineDown conn={colState.isDownCol}/>
      </LadderConnection>
    </NodeParentStyle>
  );
}

export default InputNode