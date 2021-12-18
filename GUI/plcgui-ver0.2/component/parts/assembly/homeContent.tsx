import { useState, VFC } from "react";
import styled from "styled-components";
import ProjectCreate from "../planefigure/homeContent/projectCreate";
import ProjectListDisplay from "../planefigure/homeContent/projectListDisplay";

const AreaParent = styled.div`
  width: 100%;
`;

const HomeContent: VFC = () => {
  const [trigger, setTrigger] = useState(true);
  return (
    <AreaParent>
      <ProjectCreate
        setTrigger={setTrigger}
      />
      <ProjectListDisplay
        trigger={trigger}
        setTrigger={setTrigger}
      />
    </AreaParent>
  )
}

export default HomeContent