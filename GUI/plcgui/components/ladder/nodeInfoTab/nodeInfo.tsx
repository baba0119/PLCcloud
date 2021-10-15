import { VFC } from "react";
import styled from "styled-components";
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
      </NodeInfoBody>
    </>
  )
}

export default NodeInfoTab