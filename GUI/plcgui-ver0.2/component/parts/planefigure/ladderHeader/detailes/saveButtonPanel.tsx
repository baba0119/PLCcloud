import { useContext, VFC } from "react";
import styled from "styled-components";
import { LadderDisplayContext } from "../../../../../contexts/models/ladderDisplayContextModel";

const AreaParent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const SaveMessage = styled.p`
  margin: 0;
  color: #d67878;
  font-size: 1em;
`;

const SaveButton = styled.button`
  font-size: 1.1rem;
  background-color: #197cfd;
  color: #d5feff;
  height: 80%;
  width: 64px;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const SaveButtonPanel: VFC = () => {
  const { ladderSaveFunc, ladderInitFunc } = useContext(LadderDisplayContext)

  const clickHandeler = () => {
    ladderSaveFunc()
    ladderInitFunc()
  }

  return (
    <AreaParent>
      <SaveButton onClick={() => clickHandeler()}>Save</SaveButton>
    </AreaParent>
  )
}

export default SaveButtonPanel