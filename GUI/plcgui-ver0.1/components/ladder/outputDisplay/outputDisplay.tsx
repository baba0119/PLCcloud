import { useContext, useEffect, useState, VFC } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { ioStateModel } from "../../../context/ladderEntity/ladderInitialState";
import { ladderDisplayContext } from "../../../model/ladderDisplayContextModel";
import { ladderOutputAnalysis } from "./ladderOutputAnalysis";

const OutputDisplaySpace = styled.div`
  background-color: #fffdf5;
  width: 232px;
  margin: 16px 8px;
  padding: 8px 16px 8px 16px;
`;

const PanelFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 8px 0;
  padding: 8px 16px 8px 16px;
  background-color: #f9fbff;
`;

const NodeName = styled.h3`
  margin: 0;
  color: #4f4f4f;
`;

// #f57543
// #4381f5
const PinState = styled.h3<{pin: boolean}>`
  margin: 0;
  padding: 0 8px;
  color: ${({ pin }) => ( pin ? "#f57543" : "#4381f5")};
  background-color: ${({ pin }) => ( pin ? "#f5754324" : "#4381f522")};
`;

const OutputDisplay: VFC = () => {
  const { displayState } = useContext(ladderDisplayContext)

  // 出力パネルのリスト
  const [outputList, setInputList] = useState<ioStateModel[]>([]);

  useEffect(() => {
    const pinList = ladderOutputAnalysis(displayState.ladderRecordData);
    setInputList(pinList);
  }, [displayState.ladderRecordData])

  return (
    <OutputDisplaySpace>
      {outputList.map(io => (
        <PanelFlex key={uuidv4()}>
          <NodeName>{io.nodeName}</NodeName>
          <PinState pin={io.ioState}>{(io.ioState ? "High" : "Low")}</PinState>
        </PanelFlex>
      ))}
    </OutputDisplaySpace>
  )
}

export default OutputDisplay