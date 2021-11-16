import { createContext, Dispatch, FC, useReducer } from "react";
import { ladderCreateActions } from "../model/ladderCreateActions";
import { ladderCreatetDisplayModel } from "../model/ladderStateModel";
import { ladderCreateDisplayInitialState } from "../reducer/initialState/ladderCreateDisplay";
import { ladderDisplayReducer } from "../reducer/ladderCreateDisplay";

type contextType = {
  state: ladderCreatetDisplayModel
  dispatch: Dispatch<ladderCreateActions>
}

export const createDisplayContext = createContext<contextType>({} as contextType);

const LadderCreateDisplayProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    ladderDisplayReducer,
    ladderCreateDisplayInitialState
  );

  return (
    <createDisplayContext.Provider value={{state, dispatch}}>
      {children}
    </createDisplayContext.Provider>
  )
}

export default LadderCreateDisplayProvider