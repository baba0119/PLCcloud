import { VFC } from "react";
import styled from "styled-components";
import PlacementPanel from "../planefigure/ladderPlacement/placementPanel";

const AreaParent = styled.div`
  width: 100%;
`;

const LadderPlacement: VFC = () => {
  return (
    <AreaParent>
      <PlacementPanel/>
    </AreaParent>
  )
}

export default LadderPlacement
