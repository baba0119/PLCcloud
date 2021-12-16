import { VFC } from 'react';
import styled from 'styled-components';

const HeaderArea = styled.div`
  width: 100%;
  height: 64px;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ContentPartArea = styled.div`
  width: 60%;
`;

type homeModel = {
  HeaderPart: VFC
  HomeContentPart: VFC
}
const HomeFlame: VFC<homeModel> = ({
  HeaderPart,
  HomeContentPart
}) => {
  return (
    <>
      <HeaderArea>
        <HeaderPart/>
      </HeaderArea>
      <ContentArea>
        <ContentPartArea>
          <HomeContentPart/>
        </ContentPartArea>
      </ContentArea>
    </>
  )
}

export default HomeFlame