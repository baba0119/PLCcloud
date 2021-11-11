import { VFC } from "react";
import styled from "styled-components";

const AreaParent = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const ContentArea = styled.div`
  width: 248px;
`;

const LadderPlacement: VFC = () => {
  return (
    <AreaParent>
      <ContentArea>
        
      </ContentArea>
    </AreaParent>
  )
}

export default LadderPlacement
