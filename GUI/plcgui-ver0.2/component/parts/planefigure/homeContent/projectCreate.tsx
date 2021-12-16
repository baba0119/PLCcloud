import { VFC } from "react";
import styled from "styled-components";

const AreaParent = styled.div`
  width: 100%;
`;

const ProjectNameInputTitle = styled.h3`
  color: #4e4e4e;
`;

const DataInputArea = styled.div`
  width: 100%;
  display: flex;
`;

const ProjectNameInput = styled.input`
  width: 80%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
`;

const ControlBtnArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const NewProjectCreateBtn = styled.button`
  width: 80%;
  height: 80%;
  color: #f9f9f9;
  font-size: 16px;
  background-color: #008deb;
  border: none;
  border-radius: 4px;
  :hover{
    opacity: 0.7;
  }
`;

const ProjectCreate: VFC = () => {
  return (
    <AreaParent>
      <ProjectNameInputTitle>project name</ProjectNameInputTitle>
      <DataInputArea>
        <ProjectNameInput/>
        <ControlBtnArea>
          <NewProjectCreateBtn>create</NewProjectCreateBtn>
        </ControlBtnArea>
      </DataInputArea>
    </AreaParent>
  )
}

export default ProjectCreate