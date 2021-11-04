import { useContext, useEffect, useState, VFC } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { ioStateModel } from "../../../context/ladderEntity/ladderInitialState";
import { inputActionContext } from "../../../model/ladderDebugContextModel";
import { ladderDisplayContext } from "../../../model/ladderDisplayContextModel";
import ControlPanel from "./controlPanel";
import { ladderInputAnalysis } from "./ladderInputAnalysis";

const PanelFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 232px;
  margin: 16px 8px;
  padding: 8px 16px 8px 16px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
  background-color: #f9fbff;
`;

const InputControl: VFC = () => {
  const { displayState } = useContext(ladderDisplayContext);
  const { ioStateSet } = useContext(inputActionContext);

  // 入力パネルのリスト
  const [inputList, setInputList] = useState<ioStateModel[]>([]);

  useEffect(() => {
    const pinList = ladderInputAnalysis(displayState.ladderRecordData);
    setInputList(pinList);
  }, [displayState.ladderRecordData])

  // マウス操作時の処理
  const inputSend = (io: ioStateModel) => {
    const diffIo = inputList.findIndex(node => node.nodeName === io.nodeName);
    const inputListCopy = inputList.slice();
    inputListCopy.splice(diffIo, 1, io);
    setInputList(inputListCopy);

    ioStateSet(inputListCopy);
  }

  return (
    <>
      {inputList.map(ioPin => (
        <PanelFlex key={uuidv4()}>
          <ControlPanel
            io={ioPin}
            ioControl={inputSend}
          />
        </PanelFlex>
      ))}
    </>
  )
}

export default InputControl