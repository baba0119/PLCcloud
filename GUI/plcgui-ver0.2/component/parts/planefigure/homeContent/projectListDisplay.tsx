import { useEffect, useState, VFC } from "react";
import { Dispatch, SetStateAction } from "react";
import Link from 'next/link'
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { END_POINT } from "../../../../utils/endpoint";
import { ladderCreateDisplayInitialState } from "../../../../slices/initialState/ladderCreateDisplay";

const AreaParent = styled.div`
  width: 100%;
`;

const ProjectListTitle = styled.h3`
  color: #4e4e4e;
  margin-top: 28px;
  margin-bottom: 12px;
`;

const ProjectListArea = styled.div`
  width: 90%;
  border-radius: 4px;
  border: 2px solid #b9b9b9;
`;

const ProjectArea = styled.div`
  height: 7vh;
  display: flex;
  border-bottom: 2px solid #b9b9b9;
  background-color: #fdfdfd;
  :hover{
    background-color: #eff1ff;
  }
`;

const ProjectNameArea = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const ProjectName = styled.p`
  font-size: 1.2rem;
  color: #414141;
  margin-left: 8px;
  cursor: default;
`;

const ControlPanelArea = styled.div`
  width: 28%;
  display: flex;
  align-items: center;
`;

const ControlBtn = styled.div<{color: string}>`
  width: 40%;
  height: 70%;
  border-radius: 4px;
  background-color: ${({color}) => color};
  margin: 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover{
    opacity: 0.7;
  }
`;

const ControlText = styled.p`
  color: #f9f9f9;
  font-size: 1rem;
  cursor: default;
`;

type Props = {
  trigger: boolean
  setTrigger: Dispatch<SetStateAction<boolean>>
}
const ProjectListDisplay: VFC<Props> = ({
  trigger,
  setTrigger
}) => {
  type projectFlame = {
    Id: string
    Name: string
  }
  const [projectList, setProjectList] = useState([{} as projectFlame]);

  useEffect(() => {
    const userid = sessionStorage.getItem("userid") as string;
    const endpoint = END_POINT + `/project?userid=${userid}`;
    if (trigger) {
      fetch(endpoint, {
        method: "GET",
        mode: "cors",
        credentials: 'include',
      }).then(res => {
        if (!res.ok) {
          console.log("サーバーエラー");
          return
        }
        return res.json()
      }).then(res => {
        console.log(res);
        setProjectList(res);
      }).catch(error => {
        console.log("通信失敗");
      })

      setTrigger(false);
    }
  }, [setTrigger, trigger])

  const projectDelete = (project: projectFlame) => {
    type deleteProjectReqFlame = {
      token: string
      userid: string
      projectid: string
    }
    const deleteReq: deleteProjectReqFlame = {
      token: sessionStorage.getItem("token") as string,
      userid: sessionStorage.getItem("userid") as string,
      projectid: project.Id
    }
    const isDelete = confirm(`${project.Name} を削除しますか？`)
    if (!isDelete) {
      return
    }
    const endpoint = END_POINT + "/project"
    fetch(endpoint, {
      method: "DELETE",
      mode: "cors",
      credentials: 'include',
      body: JSON.stringify(deleteReq),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (!res.ok) {
        console.log("サーバーエラー");
      }
      if (res.ok) {
        setTrigger(true);
      }
    }).catch(error => {
      console.log("通信失敗");
    })
  }

  const projectIdSet = (projectId: string) => {
    sessionStorage.setItem("projectid", projectId);
  }

  return (
    <AreaParent>
      <ProjectListTitle>projects</ProjectListTitle>
      <ProjectListArea>
        {projectList.map(project => (
          <ProjectArea key={uuidv4()}>
            <ProjectNameArea>
              <ProjectName>{project.Name}</ProjectName>
            </ProjectNameArea>
            <ControlPanelArea>
              <Link href="/ladder/Assemble" passHref>
                <ControlBtn
                  color="#02751b"
                  onClick={() => projectIdSet(project.Id)}
                >
                  <ControlText>edit</ControlText>
                </ControlBtn>
              </Link>
              <Link href="/ladder/console" passHref>
                <ControlBtn
                  color="#022175"
                >
                  <ControlText>console</ControlText>
                </ControlBtn>
              </Link>
              <ControlBtn
                color="#eb001f"
                onClick={() => projectDelete(project)}
              >
                <ControlText>delete</ControlText>
              </ControlBtn>
            </ControlPanelArea>
          </ProjectArea>
        ))}
      </ProjectListArea>
    </AreaParent>
  )
}

export default ProjectListDisplay