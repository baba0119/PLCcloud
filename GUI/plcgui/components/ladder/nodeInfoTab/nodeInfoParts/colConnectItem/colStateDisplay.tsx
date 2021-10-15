import { useContext, VFC } from "react";
import Image from 'next/image'
import styled from "styled-components";
import a from "../images/a.png";
import b from "../images/b.png";
import contact from "../images/contact.png";
import relay from "../images/output.png";
import none from "../images/none.png";
import { ladderDisplayContext } from "../../../../../model/ladderDisplayContextModel";

const DisplayArea = styled.div`
  width: 82px;
`;

const NodePrintArea = styled.div`
  width: 82px;
  display: flex;
`;

const NodeImageAreaParent = styled.div`
  display: flex;
  align-items: center;
`;

const NodeImageArea = styled.div`
  width: 80px;
`;

const LineArea = styled.div`
  width: 1px;
`;

// ${ ({ conn }) => conn ? "#000000" : "#e9e9e9"};
const ColConnLine = styled.div<{ conn: boolean }>`
  width: 1px;
  height: 50px;
  background-color: ${ ({ conn }) => conn ? "#000000" : "#e9e9e9"};
`;

type NodeImageModel = {
  // type KindsModel = "contact" | "a" | "b" | "relay" | ""
  [index: string]: {
    src: StaticImageData
    alt: string
  }
}
const ColStateDisplay: VFC = () => {
  const { displayState } = useContext(ladderDisplayContext)

  const x = displayState.point.x;
  const y = displayState.point.y;

  const record = displayState.ladderRecordData[y]

  const rightHigh = record.ladderData[x].colState.isUpCol;
  const rightLow = record.ladderData[x].colState.isDownCol;
  const leftHigh = ( x ? record.ladderData[x-1].colState.isUpCol : true);
  const leftLow = ( x ? record.ladderData[x-1].colState.isDownCol : true);

  const nodeKind = record.ladderData[x].ladderNode.info;

  const NodeImageList: NodeImageModel = {};
  NodeImageList["a"] = {
    src: a,
    alt: "a接点"
  };
  NodeImageList["b"] = {
    src: b,
    alt: "b接点"
  };
  NodeImageList["contact"] = {
    src: contact,
    alt: "接続線"
  };
  NodeImageList["relay"] = {
    src: relay,
    alt: "出力接点"
  };
  NodeImageList[""] = {
    src: none,
    alt: "none"
  };

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
              width={80}
            />
          </NodeImageArea>
        </NodeImageAreaParent>
        <LineArea>
          <ColConnLine conn={rightHigh}/>
          <ColConnLine conn={rightLow}/>
        </LineArea>
      </NodePrintArea>
    </DisplayArea>
  );
}

export default ColStateDisplay;