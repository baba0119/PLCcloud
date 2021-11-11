import { VFC } from "react";
import styled from "styled-components";

// デバッグ開始ボタンのスタイル
const DebugButtonStyle = styled.button`
  background-color: #1fbb27;
  color: #d2ffd4;
  height: 80%;
  width: 64px;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const DebugButton: VFC = () => {
  return (
    <DebugButtonStyle>
      debug
    </DebugButtonStyle>
  )
}

export default DebugButton