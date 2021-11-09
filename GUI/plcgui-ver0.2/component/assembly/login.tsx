import { VFC } from 'react';
import LoginFrame from '../blueprint/flame/loginFrame';
import LoginForm from '../parts/assembly/loginForm';
import RemoveHeader from '../parts/assembly/removeHeader';

const Login: VFC = () => {
  return (
    <LoginFrame
      HeaderPart={RemoveHeader}
      LoginFormPart={LoginForm}
    />
  )
}

export default Login