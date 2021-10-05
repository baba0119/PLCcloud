import { VFC } from 'react';
import styled from "styled-components";
import LadderDisplay from '../ladder-display/ladderDisplay';

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
  width: 100%;
  margin: 0 auto;
  display: flex;
`;

// 両側タブのスペース
const SideTabSpace = styled.div`
  width: 20%;
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
        <ContentSpace>
          <SideTabSpace></SideTabSpace>
          <MainContentSpace><LadderDisplay/></MainContentSpace>
          <SideTabSpace></SideTabSpace>
        </ContentSpace>
      </ParentMainContent>
    </>
  );
}

export default LadderDebugFormat;