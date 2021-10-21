import { VFC } from 'react';
import styled from "styled-components";
import LadderDebugContextProvider from '../../../context/debug/ladderDebugContextProvider';
import InputControl from '../inputControl/inputControl';
import LadderDisplay from '../ladder-display/ladderDisplay';
import OutputDisplay from '../outputDisplay/outputDisplay';

// スタイルの作成 ------------------------------
// 親要素として最大幅
const ParentMainContent = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #fdfddf;
`;

// 主となるコンテンツのスペース
const ContentSpace = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
`;

// 両側タブのスペース
const SideTabSpace = styled.div`
  width: 248px;
`;

// メインタブのスペース
const MainContentSpace = styled.div`
  background-color: #ffffef;
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
`;
// ---------------------------------------------

const LadderDebugFormat: VFC = () => {
  return (
    <>
      <ParentMainContent>
        <LadderDebugContextProvider>
          <ContentSpace>
            <SideTabSpace><InputControl/></SideTabSpace>
            <MainContentSpace><LadderDisplay/></MainContentSpace>
            <SideTabSpace><OutputDisplay/></SideTabSpace>
          </ContentSpace>
        </LadderDebugContextProvider>
      </ParentMainContent>
    </>
  );
}

export default LadderDebugFormat;