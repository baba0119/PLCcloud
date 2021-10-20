import { VFC } from "react";
import styled from "styled-components";
import { ioStateModel } from "../../../context/ladderEntity/ladderInitialState";

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

const GpioControl = styled.button`
  color: #4f4f4f;
`;

const ControlPanel: VFC<ioStateModel> = ({
  nodeName,
  ioState
}) => {
  return (
    <>
      <NodeName>{nodeName}</NodeName>
      <PinState pin={ioState}>{(ioState ? "High" : "Low")}</PinState>
      <GpioControl>Push</GpioControl>
    </>
  )
}

export default ControlPanel;