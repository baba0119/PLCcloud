import { VFC } from "react";
import styled from "styled-components";
import ConsoleDisplayFlame from "../flame/consoleDisplayFlame";
import Status from "../planefigure/plcControl/status";
import Control from "../planefigure/plcControl/control";

const AreaParent = styled.div`
  width: 100%;
`;

const PLCContorol: VFC = () => {
  return (
    <AreaParent>
      <ConsoleDisplayFlame
        texts="status"
        Component={Status}
      />
      <ConsoleDisplayFlame
        texts="control"
        Component={Control}
      />
    </AreaParent>
  )
}

export default PLCContorol