import { useContext, VFC } from "react";
import styled from "styled-components";
import { createDisplayContext } from "../../../contexts/ladderCreateDisplayProvider";
import NodePrint from "../planefigure/ladderDisplay/nodePrint";

const ParentArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

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
  border-top: 1px solid #e9e9e9;
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
  const { state } = useContext(createDisplayContext)

  return (
    <ParentArea>
      <DisplayParent>
        <LadderDisplayWidth>
          {state.ladderRecordData.map((record, y) => (
            <LadderRecordParent key={record.id}>
              {record.ladderData.map((node, x) => (
                <div key={node.id}>
                  <NodePrint
                    id={node.id}
                    isChoice={node.isChoice}
                    colState={node.colState}
                    x={x}
                    y={y}
                  >
                    <div></div>
                  </NodePrint>
                </div>
              ))}
            </LadderRecordParent>
          ))}
        </LadderDisplayWidth>
      </DisplayParent>
    </ParentArea>
  )
}

export default LadderDisplay