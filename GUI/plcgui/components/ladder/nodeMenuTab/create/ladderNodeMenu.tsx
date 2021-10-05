import { VFC } from 'react';
import Image from 'next/image';
import styled from "styled-components";

import { ladderNodeMenuData } from './ladderNodeMenuData';

// スタイル
// 表示部親要素
const MenuParent = styled.div`
  padding: 8px 0 8px 0;
  display: flex;
  flex-wrap: wrap;
  width: 248px;
`;

// ボタンのデザイン
const NodeButton = styled.button`
  background-color: #ffffff;
  border: none;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
  width: 70px;
  height: 70px;
  border-radius: 8px;
  text-align: center;
  vertical-align: middle;
  margin: 8px 10px 8px 0;
  &:hover {
    opacity: 0.7;
  }
`;

//
// 各操作を行うボタンを並べて表示する
//
const LadderNodeMenu: VFC = () => {
  return (
    <>
      <MenuParent>
        {ladderNodeMenuData.map(data => (
          <NodeButton key={data.id}>
            <Image
              src={data.image}
              alt={data.alt}>
            </Image>
          </NodeButton>
        ))}
      </MenuParent>
    </>
  );
}

export default LadderNodeMenu;