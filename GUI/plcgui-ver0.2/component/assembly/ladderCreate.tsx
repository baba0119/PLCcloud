import { VFC } from "react";
import LadderCreateFlame from "../blueprint/flame/ladderCreateFlame";
import LadderDisplay from "../parts/assembly/ladderDisplay";
import LadderHeader from "../parts/assembly/ladderHeader";
import LadderNodeSetting from "../parts/assembly/ladderNodeSetting";
import LadderPlacement from "../parts/assembly/ladderPlacement";
import RemoveHeader from "../parts/assembly/removeHeader";

const LadderCreate: VFC = () => {
  return (
    <LadderCreateFlame
      HeaderPart={RemoveHeader}
      LadderHeaderPart={LadderHeader}
      LadderPlacementPart={LadderPlacement}
      LadderDisplayPart={LadderDisplay}
      LadderNodeSettingPart={LadderNodeSetting}
    />
  )
}

export default LadderCreate

// /ladder/Assemble