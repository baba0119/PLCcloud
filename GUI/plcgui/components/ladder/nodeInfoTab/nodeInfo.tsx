import { VFC } from "react";
import styled from "styled-components";
import NodeNameInput from "./nodeInfoParts/nodeNameInput";

const NodeInfoBody = styled.div`
  width: 232px;
  margin: 16px 8px;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
  background-color: #f9faff;
`;

const NodeInfoTab: VFC = () => {
  return (
    <>
      <NodeInfoBody>
        <NodeNameInput/>
      </NodeInfoBody>
    </>
  )
}

export default NodeInfoTab