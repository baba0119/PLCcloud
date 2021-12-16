import React, { useState, VFC } from "react";
import styled from "styled-components";
import { END_POINT } from "../../../../utils/endpoint";

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
  const [projectName, setProjectName] = useState("");

  const onChangeProjectName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectName(event.target.value);
  }

  const newProjectBtnHandler = () => {
    type ProjectFlame = {
      userid: string
      token: string
      name: string
    }
    const newProject: ProjectFlame = {
      userid: sessionStorage.getItem("userid") as string,
      token: sessionStorage.getItem("token") as string,
      name: projectName
    }
    const endpoint = END_POINT + "/project"
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      body: JSON.stringify(newProject),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (!res.ok) {
        console.log("サーバーエラー");
      }
      if (res.ok) {
        setProjectName("");
      }
    }).catch(error => {
      console.log("通信失敗");
    })
  }

  return (
    <AreaParent>
      <ProjectNameInputTitle>project name</ProjectNameInputTitle>
      <DataInputArea>
        <ProjectNameInput
          value={projectName}
          onChange={onChangeProjectName}
        />
        <ControlBtnArea>
          <NewProjectCreateBtn onClick={() => newProjectBtnHandler()}>
            create
          </NewProjectCreateBtn>
        </ControlBtnArea>
      </DataInputArea>
    </AreaParent>
  )
}

export default ProjectCreate