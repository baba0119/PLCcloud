import { useContext, VFC } from "react";
import styled from "styled-components";
import { NodeInfoContext } from "../../../model/nodeInfoContextModel";
import ColConnectSetting from "./nodeInfoParts/colConnectSetting";
import NodeNameInput from "./nodeInfoParts/nodeNameInput";

const NodeInfoBody = styled.div`
  width: 232px;
  margin: 16px 8px;
  padding: 8px 8px 16px 12px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
  background-color: #f9fbff;
`;

const Underline = styled.div`
  width: 100%;
  border-bottom: 1px solid #cfcfcf;
  margin-top: 18px;
`;

const NodeInfoTab: VFC = () => {
  return (
    <>
      <NodeInfoBody>
        <NodeNameInput/>
        <Underline/>
        <ColConnectSetting/>
        <Underline/>
        <NodeDeleteControl/>
      </NodeInfoBody>
    </>
  )
}

const DeleteButtonArea = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NodeDeleteTitle = styled.h3`
  color: #4e4e4e;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const NodeDeleteButton = styled.button`

`;

const NodeDeleteControl: VFC = () => {
  const { nodeDelete } = useContext(NodeInfoContext);

  return (
    <>
      <NodeDeleteTitle>接点の削除</NodeDeleteTitle>
      <DeleteButtonArea>
        <NodeDeleteButton onClick={() => nodeDelete()}>
          Delete
        </NodeDeleteButton>
      </DeleteButtonArea>
    </>
  );
}

export default NodeInfoTab