import { VFC } from "react";
import styled from "styled-components";

const AreaParent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StatusArea = styled.p`
  font-size: 20px;
  color: #444444;
`;

const Status: VFC = () => {
  return (
    <AreaParent>
      <StatusArea>online, running</StatusArea>
    </AreaParent>
  )
}

export default Status