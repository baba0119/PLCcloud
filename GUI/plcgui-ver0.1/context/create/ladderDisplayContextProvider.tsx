import { FC, useReducer } from 'react';
import { KindsModel, ladderRecordDataModel } from '../../model/ladderDataModel';
import { ladderDisplayInitialState, ladderDisplayInitialStateModel } from '../ladderEntity/ladderInitialState';
import { ladderCreateSlice } from './ladderCreateSlice';
import { ladderDisplayActionModel, ladderDisplayContext, point } from '../../model/ladderDisplayContextModel';
import { colPatternModel, ladderUpdateActionModel, NodeMenuContext } from '../../model/nodeMenuContextModel';
import { colSettingModel, NodeInfoContext, nodeInfoUpdateModel } from '../../model/nodeInfoContextModel';

const LadderDisplayContextProvider: FC = ({ children }) => {
  const [ladderState, dispatch] = useReducer(
    ladderCreateSlice.reducer, ladderDisplayInitialState
  );

  const { pointSelecter, nodeUpdate, colUpdate, colSetting, nodeNameUpdate, nodeDelete, ladderSet } = ladderCreateSlice.actions;

  const ladderUpdateAction: ladderUpdateActionModel = {
    nodeUpdate: (kinds: KindsModel) => dispatch(nodeUpdate(kinds)),
    colUpdate: (colPattern: colPatternModel) => dispatch(colUpdate(colPattern))
  }

  const ladderDisplayAction: ladderDisplayActionModel = {
    pointSelect: (point: point) => dispatch(pointSelecter(point)),
    ladderSet:(displayData: ladderRecordDataModel[]) => dispatch(ladderSet(displayData))
  }

  const nodeInfoUpdate: nodeInfoUpdateModel = {
    nameChange: (name: string) => dispatch(nodeNameUpdate(name)),
    colSetting: (colSettingInfo: colSettingModel) => dispatch(colSetting(colSettingInfo)),
    nodeDelete: () => dispatch(nodeDelete())
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
          ladderDisplayAction: ladderDisplayAction
        }}
      >
        <NodeInfoContext.Provider
          value={{
            nameChange: nodeInfoUpdate.nameChange,
            colSetting: nodeInfoUpdate.colSetting,
            nodeDelete: nodeInfoUpdate.nodeDelete
          }}
        >
          {children}
        </NodeInfoContext.Provider>
      </ladderDisplayContext.Provider>
    </NodeMenuContext.Provider>
  );
}

export default LadderDisplayContextProvider;