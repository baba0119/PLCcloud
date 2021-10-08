import { useContext, VFC } from "react";
import styled from "styled-components";
import { ladderDisplayContext } from "../../../model/ladderDisplayContextModel";

const NodeInfoBody = styled.div`
  width: 232px;
  margin: 16px 8px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
`;

const NodeInfoTab: VFC = () => {

  return (
    <>
      <NodeInfoBody></NodeInfoBody>
    </>
  )
}

export default NodeInfoTab