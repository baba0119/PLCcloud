import { useContext, VFC } from 'react';
import Image from 'next/image';
import styled from "styled-components";

import { ladderNodeMenuData, ladderNodeMenuDataModel } from './ladderNodeMenuData';
import { colPatternModel, NodeMenuContext } from '../../../../model/nodeMenuContextModel';
import { KindsModel } from '../../../../model/ladderDataModel';

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
          <div key={data.id}>
            <MenuNode
              id={data.id}
              kinds={data.kinds}
              image={data.image}
              alt={data.alt}
              control={data.control}
            />
          </div>
        ))}
      </MenuParent>
    </>
  );
}

//
// 各操作を行うボタン
//
const MenuNode: VFC<ladderNodeMenuDataModel> = ({
  kinds,
  image,
  alt,
  control
}) => {
  const { nodeUpdate, colUpdate } = useContext(NodeMenuContext);
  switch ( kinds ) {
    case "node": {
      return (
        <NodeButton onClick={() => nodeUpdate(control as KindsModel)}>
          <Image
            src={image}
            alt={alt}>
          </Image>
        </NodeButton>
      )
    }
    case "col": {
      return (
        <NodeButton onClick={() => colUpdate(control as colPatternModel)}>
          <Image
            src={image}
            alt={alt}>
          </Image>
        </NodeButton>
      )
    }
  }

}

export default LadderNodeMenu;