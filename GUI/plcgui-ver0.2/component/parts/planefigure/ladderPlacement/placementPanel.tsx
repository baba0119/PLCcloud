import { VFC } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import PanelTemplate from "./details/panelTemplate";
import { placementPanelEntity } from "./entity/placementEntity";

const AreaParent = styled.div`
  width: 100%;
`;

const PlacementPanel: VFC = () => {
  return (
    <AreaParent>
      {placementPanelEntity.map(data => (
        <div key={uuidv4()}>
          <PanelTemplate
            panelTitle={data.panelTitle}
            placementMenuData={data.placementMenuData}
          />
        </div>
      ))}
    </AreaParent>
  )
}

export default PlacementPanel