import { FC, useReducer } from 'react';
import { KindsModel } from '../../model/ladderDataModel';
import { ladderDisplayInitialState } from '../ladderEntity/ladderInitialState';
import { ladderCreateSlice } from './ladderCreateSlice';
import { ladderDisplayContext, point, pointSelectActionModel } from '../../model/ladderDisplayContextModel';
import { colPatternModel, ladderUpdateActionModel, NodeMenuContext } from '../../model/nodeMenuContextModel';

const LadderDisplayContextProvider: FC = ({ children }) => {
  const [ladderState, dispatch] = useReducer(
    ladderCreateSlice.reducer, ladderDisplayInitialState
  );

  const { pointSelecter, nodeUpdate, colUpdate } = ladderCreateSlice.actions;

  const ladderUpdateAction: ladderUpdateActionModel = {
    nodeUpdate: (kinds: KindsModel) => dispatch(nodeUpdate(kinds)),
    colUpdate: (colPattern: colPatternModel) => dispatch(colUpdate(colPattern))
  }

  const pointSelect: pointSelectActionModel = {
    pointSelect: (point: point) => dispatch(pointSelecter(point))
  }

  return (
    <NodeMenuContext.Provider
      value={{
        nodeUpdate: ladderUpdateAction.nodeUpdate,
        colUpdate: ladderUpdateAction.colUpdate
      }}
    >
      <ladderDisplayContext.Provider
        value={{
          displayState: ladderState,
          pointSelecter: pointSelect
        }}
      >
        {children}
      </ladderDisplayContext.Provider>
    </NodeMenuContext.Provider>
  );
}

export default LadderDisplayContextProvider;