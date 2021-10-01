import { VFC } from 'react';
import styled from "styled-components";
import { ladderInitialState } from '../../context/ladderInitialState';

// ディスプレイ親要素
const DisplayParent = styled.div`
  margin:16px 10px;
  box-shadow: 2px 2px 4px 2px #d4d4d4;
  background-color: #ffffff;
  border-radius: 8px;
`;

// ラダープログラム表示幅
const LadderDisplayWidth = styled.div`
  margin: 8px;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
  height: 20px;
`;

const LadderDisplay: VFC = () => {
  return (
    <DisplayParent>
      <LadderDisplayWidth>
        {ladderInitialState.map(record => (
          record.map(data => {
            if ( !data.isProof ) {

            }
          })
        ))}
      </LadderDisplayWidth>
    </DisplayParent>
  );
}

export default LadderDisplay;