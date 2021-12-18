import { useEffect, useState, VFC } from "react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { END_POINT } from "../../../../utils/endpoint";

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
  height: 6vh;
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
  width: 20%;
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
              <ControlBtn color="#02751b">
                <ControlText>edit</ControlText>
              </ControlBtn>
              <ControlBtn color="#eb001f">
                <ControlText>setting</ControlText>
              </ControlBtn>
            </ControlPanelArea>
          </ProjectArea>
        ))}
      </ProjectListArea>
    </AreaParent>
  )
}

export default ProjectListDisplay