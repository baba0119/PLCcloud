import { VFC } from 'react';
import styled from "styled-components";
import { colStateModel } from '../../../../context/create/ladderDataModel';

// -- スタイル --
// ノードの親要素
const NodeParentStyle = styled.div`
  width: 96px;
  height: 120px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
`;

// ラダーの接点の表示スペース
const LadderNodePrint = styled.div`
  width: 95px;
  height: 100%;
`;

// ラダーの上下接続線
const LadderConnection = styled.div`
  width: 1px;
  height: 100%;
  position: relative;
`;

// boolean の値により色が変わる
// 上と接続する線
const LadderConnectionLineUp = styled.div`
  width: 1px;
  height: 50%;
  background-color: #e9e9e9;
  position: absolute;
`;
// 下と接続する線
const LadderConnectionLineDown = styled.div`
  width: 1px;
  height: 50%;
  background-color: #e9e9e9;
  position: absolute;
  top: 50%;
`;

// 何もノードがないときの表示
type Props = {
  id: string
  colState: colStateModel
}
const NodeNotProof: VFC<Props> = (props) => {
  return (
    <NodeParentStyle
      key={props.id}
    >
      <LadderNodePrint></LadderNodePrint>
      <LadderConnection>
        <LadderConnectionLineUp></LadderConnectionLineUp>
        <LadderConnectionLineDown></LadderConnectionLineDown>
      </LadderConnection>
    </NodeParentStyle>
  );
}

export default NodeNotProof