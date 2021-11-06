import { VFC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LoginButtonArea = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.div`
  height: 48px;
  margin-right: 36px;
  border-radius: 8px;
  border: 2px solid #f7f7f7;
`;

const LoginText = styled.p`
  color: #f7f7f7;
  line-height: 45px;
  font-size: 18px;
  margin: 0 8px;
`;

const LoginFormMoveButton: VFC = () => {
  return (
    <Link href="/user/login" passHref>
      <LoginButtonArea>
        <LoginButton>
          <LoginText>login</LoginText>
        </LoginButton>
      </LoginButtonArea>
    </Link>
  )
}

export default LoginFormMoveButton