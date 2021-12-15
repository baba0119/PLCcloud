import { useContext, VFC } from "react";
import styled from "styled-components";
import { LadderDisplayContext } from "../../../contexts/models/ladderDisplayContextModel";
import PlacementPanel from "../planefigure/ladderPlacement/placementPanel";

const AreaParent = styled.div`
  width: 100%;
`;

const LadderLeftTab: VFC = () => {
  const { displayState } = useContext(LadderDisplayContext);
  const mode = displayState.mode;

  return (
    <AreaParent>
      {(mode === "create" ? (
        <PlacementPanel/>
      ) : (
        <div></div>
      ))}
    </AreaParent>
  )
}

export default LadderLeftTab
