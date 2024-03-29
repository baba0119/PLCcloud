import { FC, useReducer } from "react";
import { ladderRecordDataModel } from "../../model/ladderDataModel";
import { inputActionContext, inputControlActionModel, outputNodeStateModel, outputStateContext } from "../../model/ladderDebugContextModel";
import { ladderDisplayActionModel, point, ladderDisplayContext } from "../../model/ladderDisplayContextModel";
import { ioStateModel, ladderDebugInitialState } from "../ladderEntity/ladderInitialState";
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
    ioStateSet: (ioState: ioStateModel[]) => dispatch(ioStateSet(ioState))
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
        <outputStateContext.Provider
          value={{
            nodeList: ladderState.outputState
          }}
        >
          {children}
        </outputStateContext.Provider>
      </inputActionContext.Provider>
    </ladderDisplayContext.Provider>
  )
}

export default LadderDebugContextProvider;