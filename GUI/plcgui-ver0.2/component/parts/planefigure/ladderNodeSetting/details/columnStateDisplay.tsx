import { useContext, VFC } from "react";
import Image from 'next/image'
import styled from "styled-components";
import { LadderDisplayContext } from "../../../../../contexts/models/ladderDisplayContextModel";
import { NodeImageList } from "../entity/nodeImage";

const DisplayArea = styled.div`
  width: 82px;
`;

const NodePrintArea = styled.div`
  width: 82px;
  display: flex;
`;

const NodeImageAreaParent = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NodeImageArea = styled.div`
  width: 78px;
`;

const LineArea = styled.div`
  width: 1px;
`;

const ColConnLine = styled.div<{ conn: boolean }>`
  width: 1px;
  height: 50px;
  background-color: ${ ({ conn }) => conn ? "#000000" : "#e9e9e9"};
`;

const ColumnStateDisplay: VFC = () => {
  const { displayState } = useContext(LadderDisplayContext);

  const x = displayState.point.x;
  const y = displayState.point.y;

  const record = displayState.ladderRecordData[y]

  const rightHigh = record.ladderData[x].colState.isUpCol;
  const rightLow = record.ladderData[x].colState.isDownCol;
  const leftHigh = ( x ? record.ladderData[x-1].colState.isUpCol : true);
  const leftLow = ( x ? record.ladderData[x-1].colState.isDownCol : true);

  let nodeKind = record.ladderData[x].ladderNode.info;

  const NodeImage = NodeImageList[nodeKind];

  return (
    <DisplayArea>
      <NodePrintArea>
        <LineArea>
          <ColConnLine conn={leftHigh}/>
          <ColConnLine conn={leftLow}/>
        </LineArea>
        <NodeImageAreaParent>
          <NodeImageArea>
            <Image
              src={NodeImage.src}
              alt={NodeImage.alt}
              width={76}
            />
          </NodeImageArea>
        </NodeImageAreaParent>
        <LineArea>
          <ColConnLine conn={rightHigh}/>
          <ColConnLine conn={rightLow}/>
        </LineArea>
      </NodePrintArea>
    </DisplayArea>
  )
}

export default ColumnStateDisplay