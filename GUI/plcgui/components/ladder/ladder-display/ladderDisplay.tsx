import { useContext, VFC } from 'react';
import styled from "styled-components";
import { ladderDisplayContext } from '../../../context/create/ladderDisplayContext/ladderContextModel';
import NodeNotProof from './ladderNodes/nodeNotProof';

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
  const { displayState } = useContext(ladderDisplayContext);

  return (
    <DisplayParent>
      <LadderDisplayWidth>
        {displayState.ladderRecordData.map((record, y) => (
          <LadderRecordParent key={record.id}>
            {record.ladderData.map((data, x) => (
              ( !data.isProof ? (
                <NodeNotProof
                  id={data.id}
                  colState={data.colState}
                  isChoice={data.isChoice}
                  x={x}
                  y={y}
                />
              ) : ( data.ladderNode.info === "relay" ? (
                  <NodeNotProof
                    id={data.id}
                    colState={data.colState}
                    isChoice={data.isChoice}
                    x={x}
                    y={y}
                  />
                ) : (
                  <NodeNotProof
                    id={data.id}
                    colState={data.colState}
                    isChoice={data.isChoice}
                    x={x}
                    y={y}
                  />

              )
              ))
            ))}
          </LadderRecordParent>
        ))}
      </LadderDisplayWidth>
    </DisplayParent>
  );
}

export default LadderDisplay;