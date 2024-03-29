import { VFC } from 'react';
import styled from "styled-components";
import LadderNodeMenu from '../nodeMenuTab/create/ladderNodeMenu';
import LadderDisplay from '../ladder-display/ladderDisplay';
import LadderDisplayContextProvider from '../../../context/create/ladderDisplayContextProvider';
import NodeInfoTab from '../nodeInfoTab/nodeInfo';
import Header from '../../header/header';

// スタイルの作成 ------------------------------
// 親要素として最大幅
const ParentMainContent = styled.div`
  margin: 0;
  width: 100%;
  background-color: #f4f5ff;
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
  background-color: #f9faff;
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
`;
// ---------------------------------------------

const LadderCreateFormat: VFC = () => {
  return (
    <>
      <LadderDisplayContextProvider>
        <Header info="index"/>
        <ParentMainContent>
          <ContentSpace>
            <SideTabSpace><LadderNodeMenu/></SideTabSpace>
            <MainContentSpace><LadderDisplay/></MainContentSpace>
            <SideTabSpace><NodeInfoTab/></SideTabSpace>
          </ContentSpace>
        </ParentMainContent>
      </LadderDisplayContextProvider>
    </>
  );
}

export default LadderCreateFormat;