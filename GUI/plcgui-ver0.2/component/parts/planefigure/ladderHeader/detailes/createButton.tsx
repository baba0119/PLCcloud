import { useContext, VFC } from 'react';
import styled from "styled-components";
import { LadderDisplayContext } from '../../../../../contexts/models/ladderDisplayContextModel';

// デバッグ開始ボタンのスタイル
const CreateButtonStyle = styled.button`
  background-color: #ff6600;
  color: #ffecc3;
  height: 80%;
  width: 64px;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const CreateButton: VFC = () => {
  const { modeChangeFunc } = useContext(LadderDisplayContext);

  const modeChange = () => modeChangeFunc()

  return (
    <CreateButtonStyle onClick={modeChange}>
      create
    </CreateButtonStyle>
  )
}

export default CreateButton