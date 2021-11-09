import React, { Dispatch, SetStateAction, VFC } from 'react';
import styled from 'styled-components';

const ParentArea = styled.div`
  width: 100%;
`;

const TitleText = styled.p`
font-size: 20px;
  margin: 24px 0 8px 0;
`;

const PasswordInputForm = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 2px;
`;

type Props = {
  password: string
  setPassword: Dispatch<SetStateAction<string>>
}
const PasswordForm: VFC<Props> = ({
  password,
  setPassword
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <ParentArea>
      <TitleText>
        password :
      </TitleText>
      <PasswordInputForm
        type="text"
        value={password}
        onChange={handleChange}
      />
    </ParentArea>
  )
}

export default PasswordForm