import { createContext, Dispatch, FC, useReducer } from "react";
import { colPatternModel, colSettingModel } from "../model/colPatternModel";
import { ladderCreateActions } from "../model/ladderCreateActions";
import { KindsModel, ladderRecordDataModel } from "../model/ladderDataModel";
import { ladderCreatetDisplayModel, point } from "../model/ladderStateModel";
import { ladderCreateDisplayInitialState } from "../slices/initialState/ladderCreateDisplay";
import { ladderCreateDisplaySlice } from "../slices/ladderCreateDisplaySlice";
import { LadderDisplayContext } from "./models/ladderDisplayContextModel";

const LadderCreateDisplayProvider: FC = ({ children }) => {
  const [displayState, dispatch] = useReducer(
    ladderCreateDisplaySlice.reducer, ladderCreateDisplayInitialState
  );

  const {
    pointSelecter,
    nodeUpdate,
    colUpdate,
    colSetting,
    nodeNameUpdate,
    nodeDelete,
    ladderSet
  } = ladderCreateDisplaySlice.actions;

  const pointSelect = (point: point) =>
    dispatch(pointSelecter(point));

  const nodeUpdateFunc = (kinds: KindsModel) =>
    dispatch(nodeUpdate(kinds));

  const colUpDateFunc = (colPattern: colPatternModel) =>
    dispatch(colUpdate(colPattern));

  const colSettingFunc = (colSettingInfo: colSettingModel) =>
    dispatch(colSetting(colSettingInfo));

  const nodeNameUpdateFunc = (name: string) =>
    dispatch(nodeNameUpdate(name));

  const nodeDeleteFunc = () => dispatch(nodeDelete());

  const ladderSetFunc = (displayData: ladderRecordDataModel[]) =>
    dispatch(ladderSet(displayData));

  return (
    <LadderDisplayContext.Provider
      value={{
        displayState,
        pointSelect,
        nodeUpdateFunc,
        colUpDateFunc,
        colSettingFunc,
        nodeNameUpdateFunc,
        nodeDeleteFunc,
        ladderSetFunc
      }}
    >
      {children}
    </LadderDisplayContext.Provider>
  )
}

export default LadderCreateDisplayProvider