import { FC, useReducer } from "react";
import { ladderRecordDataModel } from "../../model/ladderDataModel";
import { inputActionContext, inputControlActionModel, ioStateSetModel } from "../../model/ladderDebugContextModel";
import { ladderDisplayActionModel, point, ladderDisplayContext } from "../../model/ladderDisplayContextModel";
import { ladderDebugInitialState } from "../ladderEntity/ladderInitialState";
import { ladderDebugSlice } from "./ladderDebugSlice";

const LadderDebugContextProvider: FC = ({ children }) => {
  const [ladderState, dispatch] = useReducer(
    ladderDebugSlice.reducer, ladderDebugInitialState
  );

  // 状態を操作する処理の読み込み
  const {
    pointSelecter, ladderSet,
    ioStateSet
  } = ladderDebugSlice.actions;

  // ディスプレイの状態を扱う
  const ladderDisplayAction: ladderDisplayActionModel = {
    pointSelect: (point: point) => dispatch(pointSelecter(point)),
    ladderSet:(displayData: ladderRecordDataModel[]) => dispatch(ladderSet(displayData))
  }

  // 入力にかかわる処理の配信
  const inputControlAction: inputControlActionModel = {
    ioStateSet: (ioState: ioStateSetModel) => dispatch(ioStateSet(ioState))
  }

  return (
    <ladderDisplayContext.Provider
      value={{
        displayState: {
          ladderRecordData: ladderState.ladderRecordData,
          point: ladderState.point
        },
        ladderDisplayAction: ladderDisplayAction
      }}
    >
      <inputActionContext.Provider
        value={{
          ioStateSet: inputControlAction.ioStateSet
        }}
      >
        {children}
      </inputActionContext.Provider>
    </ladderDisplayContext.Provider>
  )
}

export default LadderDebugContextProvider;