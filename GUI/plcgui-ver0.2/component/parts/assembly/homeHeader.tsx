import { VFC } from 'react';
import styled from 'styled-components';
import LoginFormMoveButton from '../planefigure/homeHeader/loginFormMoveButton';
import Logo from '../planefigure/homeHeader/logo';

const HomeHeaderArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #1b1b1b;
`;

const HomeHeader: VFC = () => {
  return (
    <HomeHeaderArea>
      <Logo/>
      <LoginFormMoveButton/>
    </HomeHeaderArea>
  )
}

export default HomeHeader