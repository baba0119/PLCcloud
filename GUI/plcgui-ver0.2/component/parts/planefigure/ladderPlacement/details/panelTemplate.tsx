import { useContext, VFC } from "react";
import Image from 'next/image';
import styled from "styled-components";
import { ladderNodeMenuDataModel, placementDataModel } from "../entity/placementDataModel";
import { createDisplayContext } from "../../../../../contexts/ladderCreateDisplayProvider";
import { KindsModel } from "../../../../../model/ladderDataModel";
import { colPatternModel } from "../../../../../model/colPatternModel";

const AreaParent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const TitleArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// ボタンの上のタイトル
const PlacementTitle = styled.h4`
  width: 84%;
  font-size: 1.2em;
  color: #5a5a5a;
  margin: 16px 0 0 0;
`;

const PlacementButtonArea = styled.div`
  width: 84%;
  display: flex;
  flex-wrap: wrap;
`;

const PanelTemplate: VFC<placementDataModel> = ({
  panelTitle,
  placementMenuData
}) => {
  return (
    <AreaParent>
      <TitleArea>
        <PlacementTitle>{panelTitle}</PlacementTitle>
      </TitleArea>
      <PlacementButtonArea>
        {placementMenuData.map(data => (
          <div key={data.id}>
            <PlacementButton
              id={data.id}
              kinds={data.kinds}
              image={data.image}
              alt={data.alt}
              control={data.control}
            />
          </div>
        ))}
      </PlacementButtonArea>
    </AreaParent>
  )
}

//
// 各種接点の配置・接続を行うボタン
//

const PlacementButtonStyle = styled.button`
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

const PlacementButton: VFC<ladderNodeMenuDataModel> = ({
  kinds,
  image,
  alt,
  control
}) => {
  switch ( kinds ) {
    case "node": {
      return (
        <PlacementButtonStyle>
          <Image
            src={image}
            alt={alt}
          />
        </PlacementButtonStyle>
      )
    }
    case "col": {
      return (
        <PlacementButtonStyle>
          <Image
            src={image}
            alt={alt}
          />
        </PlacementButtonStyle>
      )
    }
  }
}

export default PanelTemplate