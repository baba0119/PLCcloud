import { VFC } from 'react';
import styled from "styled-components";
import CreateButton from './createButton';
import DebugButton from './debugButton';

// ヘッダー
const HeaderContent = styled.header`
  width: 100%;
  height: 128px;
  margin: 0;
  background-color: #e7e7e7;
  border-bottom: 2px solid #a8a8a8;
`;

// ページタイトル
const PageTitle = styled.h1`
  margin: 0 0 0 22px;
  font-size: 48px;
  font-family: 'Century Gothic';
  line-height: 72px;
  color: #414141;
`;

// ヘッダー - ラダープログラムの操作
const ControlPanel = styled.div`
  height: 56px;
  width: 100%;
  background-color: #f5f5f5;
  border-top: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  text-align: center;
`;

type Props = {
  info: 'index' | 'debug'
}
type ControlButtonModel = {
  [index: string]: VFC
}
const Header: VFC<Props> = ({ info }) => {
  const ControlButtons: ControlButtonModel = {};
  ControlButtons['index'] = DebugButton
  ControlButtons['debug'] = CreateButton
  const ControlButton: VFC = ControlButtons[info]

  return (
    <HeaderContent>
      <PageTitle>plc-web-app</PageTitle>
      <ControlPanel>
        <ControlButton/>
      </ControlPanel>
    </HeaderContent>
  );
}

export default Header