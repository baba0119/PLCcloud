import { VFC } from "react";
import LadderCreateFlame from "../blueprint/flame/ladderCreateFlame";
import LadderHeader from "../parts/assembly/ladderHeader";
import RemoveHeader from "../parts/assembly/removeHeader";

const LadderCreate: VFC = () => {
  return (
    <LadderCreateFlame
      HeaderPart={RemoveHeader}
      LadderHeaderPart={LadderHeader}
    />
  )
}

export default LadderCreate

// /ladder/Assemble