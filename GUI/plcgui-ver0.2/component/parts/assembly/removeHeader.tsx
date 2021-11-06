import { VFC } from 'react';
import styled from 'styled-components';
import RemoveButton from '../planefigure/removeHeader/removeButton';

const RemoveHeaderArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1b1b1b;
`;

const RemoveHeader: VFC = () => {
  return (
    <RemoveHeaderArea>
      <RemoveButton/>
    </RemoveHeaderArea>
  )
}

export default RemoveHeader