import { VFC } from "react";
import styled from 'styled-components';
import LadderCreateDisplayProvider from "../../../contexts/ladderCreateDisplayProvider";

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
  width: 20%;
  overflow-x: scroll;
  overflow-y: scroll;
  height: 85vh;
`;

const DisplayArea = styled.div`
  width: 60%;
  min-width: 1000px;
  overflow-y: scroll;
  height: 85vh;
`;

const NodeSettingArea = styled.div`
  width: 20%;
  overflow-x: scroll;
  overflow-y: scroll;
  height: 85vh;
`;

type LadderPartList = {
  HeaderPart: VFC
  LadderHeaderPart: VFC
  LadderLeftTabPart: VFC
  LadderDisplayPart: VFC
  LadderRightTabPart: VFC
}
const LadderCreateFlame: VFC<LadderPartList> = ({
  HeaderPart,
  LadderHeaderPart,
  LadderLeftTabPart,
  LadderDisplayPart,
  LadderRightTabPart
}) => {
  return (
    <>
      <HeaderArea>
        <HeaderPart/>
      </HeaderArea>
      <LadderCreateDisplayProvider>
        <LadderHeaderArea>
          <LadderHeaderPart/>
        </LadderHeaderArea>
        <ContentArea>
          <LadderArea>
            <PlacementArea>
              <LadderLeftTabPart/>
            </PlacementArea>
            <DisplayArea>
              <LadderDisplayPart/>
            </DisplayArea>
            <NodeSettingArea>
              <LadderRightTabPart/>
            </NodeSettingArea>
          </LadderArea>
        </ContentArea>
      </LadderCreateDisplayProvider>
    </>
  )
}

export default LadderCreateFlame