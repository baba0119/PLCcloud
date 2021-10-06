import { FC, useReducer } from 'react';
import { ladderDisplayInitialState } from '../../ladderEntity/ladderInitialState';
import { ladderCreateSlice } from '../ladderCreateSlice';
import { ladderDisplayContext, point, pointSelectActionModel } from './ladderContextModel';

const LadderDisplayContextProvider: FC = ({ children }) => {
  const [ladderState, dispatch] = useReducer(
    ladderCreateSlice.reducer, ladderDisplayInitialState
  );

  const { pointSelecter } = ladderCreateSlice.actions;
  const pointSelect: pointSelectActionModel = {
    pointSelect: (point: point) => dispatch(pointSelecter(point))
  }

  return (
    <ladderDisplayContext.Provider
      value={{
        displayState: ladderState,
        pointSelecter: pointSelect
      }}
    >
      {children}
    </ladderDisplayContext.Provider>
  );
}

export default LadderDisplayContextProvider;