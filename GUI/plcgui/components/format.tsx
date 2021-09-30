import { VFC } from 'react';
import styled from "styled-components";

// ---------------------------------------------
// スタイルの作成
// ---------------------------------------------
// ヘッダー
const Header = styled.header`
  width: 100%;
  height: 72px;
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

// 親要素として最大はバトル
const ParentMainContent = styled.div`
  margin: 0;
  width: 100%;
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
`;

const Format: VFC = () => {
  return (
    <>
      <Header>
        <PageTitle>
          plc-web-app
        </PageTitle>
      </Header>
      <ParentMainContent>
        <ContentSpace>
          <SideTabSpace>左</SideTabSpace>
          <MainContentSpace>まんなか</MainContentSpace>
          <SideTabSpace>右</SideTabSpace>
        </ContentSpace>
      </ParentMainContent>
    </>
  );
}

export default Format;