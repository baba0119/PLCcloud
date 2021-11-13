import { VFC } from "react";
import LadderCreateFlame from "../blueprint/flame/ladderCreateFlame";
import LadderHeader from "../parts/assembly/ladderHeader";
import LadderPlacement from "../parts/assembly/ladderPlacement";
import RemoveHeader from "../parts/assembly/removeHeader";

const LadderCreate: VFC = () => {
  return (
    <LadderCreateFlame
      HeaderPart={RemoveHeader}
      LadderHeaderPart={LadderHeader}
      LadderPlacementPart={LadderPlacement}
    />
  )
}

export default LadderCreate

// /ladder/Assemble