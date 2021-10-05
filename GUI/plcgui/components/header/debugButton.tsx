import { VFC } from 'react';
import styled from "styled-components";
import Link from 'next/link'

// デバッグ開始ボタンのスタイル
const DebugButtonStyle = styled.button`
  background-color: #1fbb27;
  color: #d2ffd4;
  height: 36px;
  width: 64px;
  margin: 10px auto;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const DebugButton: VFC = () => {
  return (
    <Link href="/debug" passHref>
      <DebugButtonStyle>
        debug
      </DebugButtonStyle>
    </Link>
  )
}

export default DebugButton