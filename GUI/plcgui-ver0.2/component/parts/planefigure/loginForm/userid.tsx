import React, { Dispatch, SetStateAction, VFC } from 'react';
import styled from 'styled-components';

const ParentArea = styled.div`
  width: 100%;
`;

const TitleText = styled.p`
font-size: 20px;
  margin: 24px 0 8px 0;
`;

const UserIdInputForm = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 2px;
`;

type Props = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}
const UserIdForm: VFC<Props> = ({
  userId,
  setUserId
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserId(event.target.value);

  return (
    <ParentArea>
      <TitleText>
        user id :
      </TitleText>
      <UserIdInputForm
        type="text"
        value={userId}
        onChange={handleChange}
      />
    </ParentArea>
  )
}

export default UserIdForm