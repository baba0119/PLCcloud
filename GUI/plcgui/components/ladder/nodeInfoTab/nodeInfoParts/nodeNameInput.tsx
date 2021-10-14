import { useContext, VFC } from "react";
import styled from "styled-components";
import { ladderDisplayContext } from "../../../../model/ladderDisplayContextModel";
import { NodeInfoContext } from "../../../../model/nodeInfoContextModel";

const NodeNameTitle = styled.h3`
  color: #4e4e4e;
  font-size: 14px;
  margin: 4px 0 0 0;
`;

const NodeNameForm = styled.input`

`;

const NodeNameInput: VFC = () => {
  const { displayState } = useContext(ladderDisplayContext);
  const { nameChange, colSetting } = useContext(NodeInfoContext)

  const x = displayState.point.x;
  const y = displayState.point.y;

  const name = displayState.ladderRecordData[y].ladderData[x].ladderNode.name;
  return (
    <>
      <NodeNameTitle>接点名</NodeNameTitle>
      <NodeNameForm
        value={name}
        onChange={(e) => nameChange(e.target.value)}
      />
    </>
  )
}

export default NodeNameInput