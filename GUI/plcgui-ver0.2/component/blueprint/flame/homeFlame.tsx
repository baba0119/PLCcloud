import { VFC } from 'react';
import styled from 'styled-components';

const HeaderArea = styled.div`
  width: 100%;
  height: 64px;
`;

const ContentArea = styled.div`
  width: 100px;
`;

type homeModel = {
  HeaderPart: VFC
}
const HomeFlame: VFC<homeModel> = ({
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

export default HomeFlame