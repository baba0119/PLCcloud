import { VFC } from 'react';
import styled from 'styled-components';

const HeaderArea = styled.div`
  width: 100%;
  height: 64px;
`;

const ContentArea = styled.div`
  width: 100%;
`;

type LoginModel = {
  HeaderPart: VFC
}
const LoginFrame: VFC<LoginModel> = ({
  HeaderPart
}) => {
  return (
    <>
      <HeaderArea>
        <HeaderPart/>
      </HeaderArea>
      <ContentArea></ContentArea>
    </>
  )
}

export default LoginFrame