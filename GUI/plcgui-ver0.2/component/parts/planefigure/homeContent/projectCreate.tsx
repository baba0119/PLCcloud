import React, { useState, VFC } from "react";
import styled from "styled-components";
import { END_POINT } from "../../../../utils/endpoint";
import { Dispatch, SetStateAction } from "react";
import { type } from "os";
import { ladderCreateDisplayInitialState } from "../../../../slices/initialState/ladderCreateDisplay";

const AreaParent = styled.div`
  width: 100%;
`;

const ProjectNameInputTitle = styled.h3`
  color: #4e4e4e;
  margin-bottom: 12px;
`;

const DataInputArea = styled.div`
  width: 100%;
  display: flex;
`;

const ProjectNameInput = styled.input`
  width: 80%;
  padding: 8px 12px;
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

type Props = {
  setTrigger: Dispatch<SetStateAction<boolean>>
}
const ProjectCreate: VFC<Props> = ({
  setTrigger
}) => {
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
        setTrigger(true);
      }
      return res.text()
    }).then(res => {
      console.log(res)
      sessionStorage.setItem("projectid", res)
    }).catch(error => {
      console.log("通信失敗");
    })

    setTimeout(() => {}, 1000)

    type saveReqFlame = {
      token: string
      userid: string
      projectid: string
      ladder: any
    }
    const saveReq: saveReqFlame = {
      token: sessionStorage.getItem("token") as string,
      userid: sessionStorage.getItem("userid") as string,
      projectid: sessionStorage.getItem("projectid") as string,
      ladder: ladderCreateDisplayInitialState.ladderRecordData
    }
    const endpoint2 = END_POINT + "/ladder"
    fetch(endpoint2, {
      method: "PUT",
      mode: "cors",
      credentials: 'include',
      body: JSON.stringify(saveReq),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (!res.ok) {
        console.log("サーバーエラー");
        return
      }
      return res.text()
    }).then(res => {
      console.log(res)
    }).catch(error => {
      console.log("通信失敗");
    })

    setTimeout(() => {}, 1000)
  }

  const onClickHndler = () => newProjectBtnHandler();

  return (
    <AreaParent>
      <ProjectNameInputTitle>project name</ProjectNameInputTitle>
      <DataInputArea>
        <ProjectNameInput
          value={projectName}
          onChange={onChangeProjectName}
        />
        <ControlBtnArea>
          <NewProjectCreateBtn onClick={onClickHndler}>
            create
          </NewProjectCreateBtn>
        </ControlBtnArea>
      </DataInputArea>
    </AreaParent>
  )
}

export default ProjectCreate