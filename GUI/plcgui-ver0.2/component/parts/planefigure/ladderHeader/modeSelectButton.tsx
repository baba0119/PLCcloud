import { useContext, VFC } from "react";
import { LadderDisplayContext } from "../../../../contexts/models/ladderDisplayContextModel";
import CreateButton from "./detailes/createButton";
import DebugButton from "./detailes/debugButton";

const ModeSelectButton: VFC = () => {
  const { displayState } = useContext(LadderDisplayContext);
  const mode = displayState.mode;
  return (
    <>
      {(mode === "create" ? (
        <DebugButton/>
      ) : (
        <CreateButton/>
      ))}
    </>
  )
}

export default ModeSelectButton