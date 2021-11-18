import { createContext, Dispatch, FC, useReducer } from "react";
import { ladderCreateActions } from "../model/ladderCreateActions";
import { ladderCreatetDisplayModel, point } from "../model/ladderStateModel";
import { ladderCreateDisplayInitialState } from "../reducer/initialState/ladderCreateDisplay";
import { ladderDisplayReducer } from "../reducer/ladderCreateDisplay";
import { ladderCreateDisplaySlice } from "../slices/ladderCreateDisplaySlice";
import { pointSelect } from "../slices/utils/pointSelect";
import { LadderDisplayContext } from "./models/ladderDisplayContextModel";

type contextType = {
  state: ladderCreatetDisplayModel
  dispatch: Dispatch<ladderCreateActions>
}

export const createDisplayContext = createContext<contextType>({} as contextType);

const LadderCreateDisplayProvider: FC = ({ children }) => {
  const [ladderState, dispatch] = useReducer(
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

  // LadderDisplayPart Context
  const pointSelect = (point: point) => dispatch(pointSelecter(point));

  return (
    <LadderDisplayContext.Provider
      value={{
        displayState: ladderState,
        pointSelect: pointSelect
      }}
    >
      {children}
    </LadderDisplayContext.Provider>
  )
}

export default LadderCreateDisplayProvider