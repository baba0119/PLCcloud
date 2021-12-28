import { VFC } from 'react';
import styled from 'styled-components';

const HeaderArea = styled.div`
  width: 100%;
  height: 64px;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ContentPartArea = styled.div`
  width: 60%;
`;


type consolePartList = {
  HeaderPart: VFC
  ProjectNamePart: VFC
  PLCUniqueNumberPart: VFC
  PLCControlPart: VFC
}
const ConsoleFlame: VFC<consolePartList> = ({
  HeaderPart,
  ProjectNamePart,
  PLCUniqueNumberPart,
  PLCControlPart
}) => {
  return (
    <>
      <HeaderArea>
        <HeaderPart/>
      </HeaderArea>
      <ContentArea>
        <ContentPartArea>
          <ProjectNamePart/>
          <PLCUniqueNumberPart/>
          <PLCControlPart/>
        </ContentPartArea>
      </ContentArea>
    </>
  )
}

export default ConsoleFlame