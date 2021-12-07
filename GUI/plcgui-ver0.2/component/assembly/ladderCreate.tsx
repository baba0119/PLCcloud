import { VFC } from "react";
import LadderCreateFlame from "../blueprint/flame/ladderCreateFlame";
import LadderDisplay from "../parts/assembly/ladderDisplay";
import LadderHeader from "../parts/assembly/ladderHeader";
import LadderRightTab from "../parts/assembly/ladderNodeSetting";
import LadderLeftTab from "../parts/assembly/ladderPlacement";
import RemoveHeader from "../parts/assembly/removeHeader";

const LadderCreate: VFC = () => {
  return (
    <LadderCreateFlame
      HeaderPart={RemoveHeader}
      LadderHeaderPart={LadderHeader}
      LadderLeftTabPart={LadderLeftTab}
      LadderDisplayPart={LadderDisplay}
      LadderRightTabPart={LadderRightTab}
    />
  )
}

export default LadderCreate

// /ladder/Assemble