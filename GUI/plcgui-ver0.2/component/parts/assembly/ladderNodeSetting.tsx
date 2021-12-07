import { useContext, VFC } from "react";
import styled from "styled-components";
import { LadderDisplayContext } from "../../../contexts/models/ladderDisplayContextModel";
import ColumnSetting from "../planefigure/ladderNodeSetting/columnSetting";
import DeleteButton from "../planefigure/ladderNodeSetting/deleteButton";
import NodeNameSetting from "../planefigure/ladderNodeSetting/nodeNameSetting";

const AreaParent = styled.div`
  width: 100%;
`;

const Underline = styled.div`
  width: 100%;
  border-bottom: 1px solid #cfcfcf;
  margin-top: 18px;
`;

const LadderRightTab: VFC = () => {
  const { displayState } = useContext(LadderDisplayContext);

  const x = displayState.point.x;
  const y = displayState.point.y;

  const kind = displayState.ladderRecordData[y].ladderData[x].ladderNode.info;
  const mode = displayState.mode;

  return (
    <AreaParent>
      {(mode === "create" ? (
        <>
          {!(kind === "contact" || kind === "") &&
            <NodeNameSetting/>
          }
          <Underline/>
          <ColumnSetting/>
          <Underline/>
          {!(kind === "") &&
            <DeleteButton/>
          }
        </>
      ) : (
        <div></div>
      ))}
    </AreaParent>
  )
}

export default LadderRightTab