import { useContext, useEffect, VFC } from "react";
import styled from "styled-components";
import { ladderDisplayContext } from "../../../model/ladderDisplayContextModel";
import { ladderInputAnalysis } from "./ladderInputAnalysis";

const InputControlBody = styled.div`
  width: 232px;
  margin: 16px 8px;
  padding: 8px 8px 16px 12px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 2px #a7a7a7;
  background-color: #f9fbff;
`;

const InputControl: VFC = () => {
  const { displayState } = useContext(ladderDisplayContext);

  useEffect(() => {
    const inputList = ladderInputAnalysis(displayState.ladderRecordData);
    console.log(inputList)

  }, [displayState.ladderRecordData])

  return (
    <InputControlBody>
    </InputControlBody>
  )
}

export default InputControl