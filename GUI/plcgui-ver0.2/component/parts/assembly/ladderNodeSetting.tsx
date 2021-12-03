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

const LadderNodeSetting: VFC = () => {
  const { displayState } = useContext(LadderDisplayContext);

  return (
    <AreaParent>
      <NodeNameSetting/>
      <Underline/>
      <ColumnSetting/>
      <Underline/>
      <DeleteButton/>
    </AreaParent>
  )
}

export default LadderNodeSetting