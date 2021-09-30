/* eslint-disable @next/next/no-img-element */
import { VFC } from 'react';
import styled from "styled-components";

import { ladderNodeMenuDataModel, ladderNodeMenuData } from './ladderNodeMenuData';

type Props = { ladderNodeMenuData: ladderNodeMenuDataModel };

// テスト用データ
// import a from './images/a.png'
// const testdata: ladderNodeMenuDataModel = {
//   id: "fjgklsjglsjdklg",
//   image: a,
//   alt: "a接点",
//   control: "a"
// }

// スタイル
// 表示部親要素
const MenuParent = styled.div`
  display: flex;
  width: 240px;
`;

// ボタンのデザイン
const NodeButton = styled.button`
  background-color: #ffffff;
  border: none;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
  width: 70px;
  height: 70px;
  border-radius: 8px;
`;

//
// 各操作を行うボタンを並べて表示する
//
const LadderNodeMenu: VFC = () => {
  return (
    <>
      <MenuParent>
        {() =>
          ladderNodeMenuData.map(data => (
            <div key={data.id}>
              <NodeButton>
                <img
                  src={data.image.src}
                  alt={data.alt}>
                </img>
              </NodeButton>
            </div>
          ))
        }
      </MenuParent>
    </>
  );
}

//
// 各接点のボタンとなるコンポーネント
//

// const LadderNodeButton: VFC<Props> = ({ ladderNodeMenuData }) => {
//   return (
//     <NodeButton>
//       <img
//         src={ladderNodeMenuData.image.src}
//         alt={ladderNodeMenuData.alt}>
//       </img>
//     </NodeButton>
//   )
// }

export default LadderNodeMenu;