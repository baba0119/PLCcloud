import { VFC } from "react";
import styled from "styled-components";
import SaveButtonPanel from "./detailes/saveButtonPanel";

const AreaParent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ProjectTitleArea = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4em;
  color: #414141;
  margin-left: 16px;
  margin-right: 36px;
`;

const SaveButtonArea = styled.div`
  width: 8%;
  height: 100%;
`;

const TopMonitor: VFC = () => {
  return (
    <AreaParent>
      <ProjectTitleArea>
        <ProjectTitle>Sample-Ladder</ProjectTitle>
      </ProjectTitleArea>
      <SaveButtonArea>
        <SaveButtonPanel/>
      </SaveButtonArea>
    </AreaParent>
  )
}

export default TopMonitor