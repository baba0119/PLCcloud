import { VFC } from 'react';
import styled from 'styled-components';

const ParentArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoginButtonStyle = styled.button`
  background-color: #114600;
  color: #f0f0f0;
  font-size: 18px;
  width: 128px;
  height: 48px;
`;

const LoginButton: VFC = () => {
  return (
    <ParentArea>
      <LoginButtonStyle>
        login
      </LoginButtonStyle>
    </ParentArea>
  )
}

export default LoginButton