import { useContext, useEffect, useState, VFC } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { ioStateModel } from "../../../context/ladderEntity/ladderInitialState";
import { inputActionContext, ioStateSetModel } from "../../../model/ladderDebugContextModel";
import { ladderDisplayContext } from "../../../model/ladderDisplayContextModel";
import ControlPanel from "./controlPanel";
import { ladderInputAnalysis } from "./ladderInputAnalysis";

const PanelFlex = styled.div`
  display: flex;
  width: 232px;
  margin: 16px 8px;
  padding: 8px 8px 16px 12px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
  background-color: #f9fbff;
`;

const InputControl: VFC = () => {
  const { displayState } = useContext(ladderDisplayContext);

  const pinData = ladderInputAnalysis(displayState.ladderRecordData);

  const [inputList, inputListSet] = useState<ioStateModel[]>(pinData);

  // .map(pin => ({
  //   nodeName: pin.nodeName,
  //   ioState: pin.ioState
  // }))

  useEffect(() => {
    console.log(inputList)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputList])

  return (
    <>
      {inputList.map(ioPin => (
          <PanelFlex key={uuidv4()}>
            <ControlPanel
              nodeName={ioPin.nodeName}
              ioState={ioPin.ioState}
            />
          </PanelFlex>
        ))
      }
    </>
  )
}

export default InputControl