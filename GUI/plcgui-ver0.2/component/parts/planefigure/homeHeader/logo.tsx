import { VFC } from 'react';
import styled from 'styled-components';

const LogoArea = styled.div`
  height: 100%;
  width: 100%;
`;

const LogoText = styled.h1`
  margin: 0 0 0 12px;
  line-height: 64px;
  color: #f7f7f7;
`;

const Logo: VFC = () => {
  return (
    <LogoArea>
      <LogoText>PLCcloud</LogoText>
    </LogoArea>
  )
}

export default Logo