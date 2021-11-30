import { useContext, VFC } from "react";
import styled from "styled-components";
import { LadderDisplayContext } from "../../../../contexts/models/ladderDisplayContextModel";

const DeleteButtonArea = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NodeDeleteTitle = styled.h3`
  color: #4e4e4e;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const NodeDeleteButton = styled.button`

`;

const DeleteButton: VFC = () => {
  const { nodeDeleteFunc } = useContext(LadderDisplayContext)

  return (
    <>
      <NodeDeleteTitle>接点の削除</NodeDeleteTitle>
      <DeleteButtonArea>
        <NodeDeleteButton onClick={nodeDeleteFunc}>
          Delete
        </NodeDeleteButton>
      </DeleteButtonArea>
    </>
  )
}

export default DeleteButton