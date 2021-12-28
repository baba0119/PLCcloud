import { VFC } from "react";
import styled from "styled-components";

const AreaParent = styled.div`
  width: 100%;
  height: 14vh;
  display: flex;
`;

const TextArea = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TextPrint = styled.h4`
  color: #444444;
  font-size: 20px;
`;

const ComponentArea = styled.div`
  width: 60%;
  height: 100%;
`;

type Props = {
  texts: string
  Component: VFC
}
const ConsoleDisplayFlame: VFC<Props> = ({
  texts,
  Component
}) => {
  return (
    <AreaParent>
      <TextArea>
        <TextPrint>{texts}</TextPrint>
      </TextArea>
      <ComponentArea>
        <Component/>
      </ComponentArea>
    </AreaParent>
  )
}

export default ConsoleDisplayFlame