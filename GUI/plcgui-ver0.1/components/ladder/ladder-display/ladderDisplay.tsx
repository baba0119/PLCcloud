import { useContext, useEffect, VFC } from 'react';
import styled from "styled-components";
import { ladderDisplayInitialState, ladderDisplayInitialStateModel } from '../../../context/ladderEntity/ladderInitialState';
import { ladderRecordDataModel } from '../../../model/ladderDataModel';
import { ladderDisplayContext } from '../../../model/ladderDisplayContextModel';
import InputNode from './ladderNodes/inputNode';
import NodeNotProof from './ladderNodes/nodeNotProof';
import OutputNode from './ladderNodes/outputNode';

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
  const { displayState, ladderDisplayAction } = useContext(ladderDisplayContext);

  // 一番最初に session storage の確認 データ取り出し
  useEffect(() => {
    const ladderData: ladderRecordDataModel[] = JSON.parse(sessionStorage.getItem('ladderData') as string) as ladderRecordDataModel[];
    if (sessionStorage.getItem('ladderData')) {
      ladderDisplayAction.ladderSet(ladderData);
    } else {
      ladderDisplayAction.ladderSet(ladderDisplayInitialState.ladderRecordData);
    }

    // sessionstorage データ確認
    // console.log(JSON.parse(sessionStorage.getItem('ladderData') as string));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              ) : ( data.ladderNode.info === 'relay' ? (
                  <OutputNode
                    id={data.id}
                    colState={data.colState}
                    isChoice={data.isChoice}
                    nodeData={data.ladderNode}
                    x={x}
                    y={y}
                  />
                ) : (
                  <InputNode
                    id={data.id}
                    colState={data.colState}
                    isChoice={data.isChoice}
                    nodeData={data.ladderNode}
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