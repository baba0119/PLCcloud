import { VFC } from 'react';
import styled from "styled-components";
import { ladderInitialState } from '../../context/ladderInitialState';
import NodeNotProof from './ladderNode';

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
  width: 960px;
`;

// ラダーレコード親要素
const LadderRecordParent = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;

const LadderDisplay: VFC = () => {
  return (
    <DisplayParent>
      <LadderDisplayWidth>
        {ladderInitialState.map((record, y) => (
          <LadderRecordParent key={record.id}>
            {record.ladderData.map((data, x) => {
              if ( !data.isProof ) {
                return (
                  <NodeNotProof
                    id={data.id}
                    colState={data.colState}
                    point={{x: x, y: y}}
                  />
                )
              }
            })}
          </LadderRecordParent>
        ))}
      </LadderDisplayWidth>
    </DisplayParent>
  );
}

export default LadderDisplay;