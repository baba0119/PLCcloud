import { useState, VFC } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../planefigure/loginForm/errorMessage';
import LoginButton from '../planefigure/loginForm/loginButton';
import PasswordForm from '../planefigure/loginForm/password';
import UserIdForm from '../planefigure/loginForm/userid';

const AreaParent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FormArea = styled.div`
  width: 60%;
  margin: 48px 0 72px 0;
`;

const LoginForm: VFC = () => {
  const [userId, setUserId] = useState("")
  const [passWord, setPassword] = useState("")
  const [loginMissed, setLoginMissed] = useState(true)

  return (
    <AreaParent>
      <ErrorMessage
        isLoginMissed={loginMissed}
      />
      <FormArea>
        <UserIdForm
          userId={userId}
          setUserId={setUserId}
        />
        <PasswordForm
          password={passWord}
          setPassword={setPassword}
        />
      </FormArea>
      <LoginButton/>
    </AreaParent>
  )
}

export default LoginForm