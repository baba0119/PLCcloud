import { VFC } from 'react';
import styled from "styled-components";
import Link from 'next/link'
import LadderNodeMenu from './left-tab/ladderNodeMenu';
import LadderDisplay from './ladder-display/ladderDisplay';

// スタイルの作成 ------------------------------
// ヘッダー
const Header = styled.header`
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

// デバッグ開始ボタンのスタイル
const DebugButton = styled.button`
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

// 親要素として最大幅
const ParentMainContent = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #f4f5ff;
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
  width: 60%;
  background-color: #f9faff;
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
`;
// ---------------------------------------------

const LadderCreateFormat: VFC = () => {
  return (
    <>
      <Header>
        <PageTitle>plc-web-app</PageTitle>
        <ControlPanel>
          <Link href="/debug" passHref>
            <DebugButton>
              debug
            </DebugButton>
          </Link>
        </ControlPanel>
      </Header>
      <ParentMainContent>
        <ContentSpace>
          <SideTabSpace><LadderNodeMenu/></SideTabSpace>
          <MainContentSpace><LadderDisplay/></MainContentSpace>
          <SideTabSpace></SideTabSpace>
        </ContentSpace>
      </ParentMainContent>
    </>
  );
}

export default LadderCreateFormat;