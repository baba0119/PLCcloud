import { VFC } from 'react';
import styled from "styled-components";
import Link from 'next/link'

// デバッグ開始ボタンのスタイル
const CreateButtonStyle = styled.button`
  background-color: #ff6600;
  color: #ffecc3;
  height: 36px;
  width: 64px;
  margin: 10px auto;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const CreateButton: VFC = () => {
  return (
    <Link href="/" passHref>
      <CreateButtonStyle>
        create
      </CreateButtonStyle>
    </Link>
  )
}

export default CreateButton