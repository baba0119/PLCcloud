import { useState, VFC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { END_POINT } from '../../../utils/endpoint';
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
  const [loginMissed, setLoginMissed] = useState(false)

  const router = useRouter()

  const loginBtnHandler = () => {
    console.log("ログインapi叩く")
    const reqData = {
      id: userId,
      password: passWord
    }
    const endPoint = END_POINT + "/login";
    fetch(endPoint, {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      body: JSON.stringify(reqData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (!res.ok) {
        setLoginMissed(true);
      }
      return res.json()
    })
    .then(res => {
      console.log(res);
      sessionStorage.setItem("token", res.Token);
      sessionStorage.setItem("isLogin", "true");
      router.replace('/');
    }).catch(error => {
      setLoginMissed(true);
    });
  }

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
      <LoginButton handleClick={() => loginBtnHandler()}/>
    </AreaParent>
  )
}

export default LoginForm