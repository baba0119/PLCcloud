import { VFC } from "react";
import styled from "styled-components";
import ConsoleDisplayFlame from "../flame/consoleDisplayFlame";

const AreaParent = styled.div`
  width: 100%;
`;

const PLCUniqueNumber: VFC = () => {
  return (
    <AreaParent>
      <ConsoleDisplayFlame/>
    </AreaParent>
  )
}

export default PLCUniqueNumber