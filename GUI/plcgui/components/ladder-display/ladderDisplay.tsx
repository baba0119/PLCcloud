import { VFC } from 'react';
import styled from "styled-components";

// ディスプレイ親要素
const DisplayParent = styled.div`
  margin:16px 10px;
  box-shadow: 2px 2px 4px 2px #d4d4d4;
  background-color: #ffffff;
  border-radius: 8px;
  height: 30px;
`;

const LadderDisplay: VFC = () => {
  return (
    <DisplayParent></DisplayParent>
  );
}

export default LadderDisplay;