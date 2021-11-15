import { VFC } from "react";
import styled from 'styled-components';

const HeaderArea = styled.div`
  width: 100%;
  height: 64px;
`;

const LadderHeaderArea = styled.div`
  width: 100%;
  height: 8vh;
`;

const ContentArea = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 85vh;
  border-bottom: 2px solid #a8a8a8;
`;

const LadderArea = styled.div`
  display: flex;
  width: 100%;
  height: 85vh;
`;

const PlacementArea = styled.div`
  width: 25%;
  overflow-x: scroll;
  overflow-y: scroll;
  height: 85vh;
`;

const DisplayArea = styled.div`
  width: 50%;
  min-width: 980px;
  overflow-y: scroll;
  height: 85vh;
`;

const NodeSettingArea = styled.div`
  width: 25%;
  overflow-x: scroll;
  overflow-y: scroll;
  height: 85vh;
`;

type LadderPartList = {
  HeaderPart: VFC
  LadderHeaderPart: VFC
  LadderPlacementPart: VFC
  LadderDisplayPart?: VFC
  LadderNodeSettingPart?: VFC
}
const LadderCreateFlame: VFC<LadderPartList> = ({
  HeaderPart,
  LadderHeaderPart,
  LadderPlacementPart,
  LadderDisplayPart,
  LadderNodeSettingPart
}) => {
  return (
    <>
      <HeaderArea>
        <HeaderPart/>
      </HeaderArea>
      <LadderHeaderArea>
        <LadderHeaderPart/>
      </LadderHeaderArea>
      <ContentArea>
        <LadderArea>
          <PlacementArea>
            <LadderPlacementPart/>
          </PlacementArea>
          <DisplayArea>

          </DisplayArea>
          <NodeSettingArea>

          </NodeSettingArea>
        </LadderArea>
      </ContentArea>
    </>
  )
}

export default LadderCreateFlame