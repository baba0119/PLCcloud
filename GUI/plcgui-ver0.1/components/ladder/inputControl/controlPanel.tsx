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

type Props = {
  io: ioStateModel
  ioControl: (io: ioStateModel) => void;
}
const ControlPanel: VFC<Props> = ({
  io,
  ioControl
}) => {
  return (
    <>
      <NodeName>{io.nodeName}</NodeName>
      <PinState pin={io.ioState}>{(io.ioState ? "High" : "Low")}</PinState>
      <GpioControl
        onMouseDown={() => ioControl({
          nodeName: io.nodeName,
          ioState: true
        })}
        onMouseUp={() => ioControl({
          nodeName: io.nodeName,
          ioState: false
        })}
      >
        Push
      </GpioControl>
    </>
  )
}

export default ControlPanel;