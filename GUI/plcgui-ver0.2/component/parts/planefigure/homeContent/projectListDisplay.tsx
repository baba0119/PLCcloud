import { VFC } from "react";
import styled from "styled-components";

const AreaParent = styled.div`
  width: 100%;
`;

const ProjectListTitle = styled.h3`
  color: #4e4e4e;
  margin-top: 28px;
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

const ControlText = styled.h5`
  color: #f9f9f9;
  font-size: 1rem;
`;

const ProjectListDisplay: VFC = () => {
  return (
    <AreaParent>
      <ProjectListTitle>projects</ProjectListTitle>
      <ProjectListArea>

        <ProjectArea>
          <ProjectNameArea>
            <ProjectName>test</ProjectName>
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
        <ProjectArea>
          <ProjectNameArea>
            <ProjectName>test</ProjectName>
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
        <ProjectArea>
          <ProjectNameArea>
            <ProjectName>test</ProjectName>
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

      </ProjectListArea>
    </AreaParent>
  )
}

export default ProjectListDisplay