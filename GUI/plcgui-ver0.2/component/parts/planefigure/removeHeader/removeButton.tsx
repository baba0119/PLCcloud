import { VFC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const RemoveButtonStyle = styled.div`
  height: 100%;
`;

const RemoveButtonText = styled.p`
  color: #f7f7f7;
  line-height: 64px;
  margin: 0 0 0 12px;
`;

const RemoveButton: VFC = () => {
  return (
    <RemoveButtonStyle>
      <Link href="/" passHref>
        <RemoveButtonText>←戻る</RemoveButtonText>
      </Link>
    </RemoveButtonStyle>
  )
}

export default RemoveButton