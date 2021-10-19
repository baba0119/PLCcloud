import { FC, useReducer } from "react";
import { ladderRecordDataModel } from "../../model/ladderDataModel";
import { ladderDisplayActionModel, point, ladderDisplayContext } from "../../model/ladderDisplayContextModel";
import { ladderDisplayInitialState } from "../ladderEntity/ladderInitialState";
import { ladderDebugSlice } from "./ladderDebugSlice";

const LadderDebugContextProvider: FC = ({ children }) => {
  const [ladderState, dispatch] = useReducer(
    ladderDebugSlice.reducer, ladderDisplayInitialState
  );

  // 状態を操作する処理の読み込み
  const {
    pointSelecter, ladderSet
  } = ladderDebugSlice.actions;

  // ディスプレイの状態を扱う
  const ladderDisplayAction: ladderDisplayActionModel = {
    pointSelect: (point: point) => dispatch(pointSelecter(point)),
    ladderSet:(displayData: ladderRecordDataModel[]) => dispatch(ladderSet(displayData))
  }

  return (
    <ladderDisplayContext.Provider
      value={{
        displayState: ladderState,
        ladderDisplayAction: ladderDisplayAction
      }}
    >
      {children}
    </ladderDisplayContext.Provider>
  )
}

export default LadderDebugContextProvider;