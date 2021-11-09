import { VFC } from 'react';
import styled from 'styled-components';

const ParentArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MessageBox = styled.div`
  width: 80%;
  text-align: center;
  background-color: #ffd1d1;
`;

const MessageText = styled.p`
  color: #ff5959;
`;

type Props = {
  isLoginMissed: boolean
}
const ErrorMessage: VFC<Props> = ({
  isLoginMissed
}) => {
  return (
    <ParentArea>
      {isLoginMissed &&
        <MessageBox>
          <MessageText>
            user id, password をもう一度入力しなおしてください
          </MessageText>
        </MessageBox>
      }
    </ParentArea>
  )
}

export default ErrorMessage