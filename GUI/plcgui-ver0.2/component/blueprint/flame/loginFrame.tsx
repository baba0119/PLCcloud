import { VFC } from 'react';
import styled from 'styled-components';

const HeaderArea = styled.div`
  width: 100%;
  height: 64px;
`;

const ContentArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoginFormFlame = styled.div`
  width: 778px;
  margin: 42px 0 0 0;
`;

type LoginModel = {
  HeaderPart: VFC
  LoginFormPart: VFC
}
const LoginFrame: VFC<LoginModel> = ({
  HeaderPart,
  LoginFormPart
}) => {
  return (
    <>
      <HeaderArea>
        <HeaderPart/>
      </HeaderArea>
      <ContentArea>
        <LoginFormFlame>
          <LoginFormPart/>
        </LoginFormFlame>
      </ContentArea>
    </>
  )
}

export default LoginFrame