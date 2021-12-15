import { VFC } from "react";
import styled from "styled-components";
import ProjectCreate from "../planefigure/homeContent/projectCreate";
import ProjectListDisplay from "../planefigure/homeContent/projectListDisplay";

const AreaParent = styled.div`
  width: 100%;
`;

const HomeContent: VFC = () => {
  return (
    <AreaParent>
      <ProjectCreate/>
      <ProjectListDisplay/>
    </AreaParent>
  )
}

export default HomeContent