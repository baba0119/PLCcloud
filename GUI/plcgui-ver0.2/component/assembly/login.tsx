import { VFC } from 'react';
import LoginFrame from '../blueprint/flame/loginFrame';
import RemoveHeader from '../parts/assembly/removeHeader';

const Login: VFC = () => {
  return (
    <LoginFrame
      HeaderPart={RemoveHeader}
    />
  )
}

export default Login