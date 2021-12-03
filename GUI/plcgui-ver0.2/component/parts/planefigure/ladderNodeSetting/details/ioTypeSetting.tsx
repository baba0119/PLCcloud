import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, VFC } from "react";
import styled from "styled-components";
import { LadderDisplayContext } from "../../../../../contexts/models/ladderDisplayContextModel";
import { IoOption, IoSelect } from "../entity/selectBoxStyles";

const AreaParent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  ioType: string
  setIoType: Dispatch<SetStateAction<string>>
}
const IoTypeSetting: VFC<Props> = ({
  ioType,
  setIoType
}) => {
  const { displayState, ioKindChangeFunc } = useContext(LadderDisplayContext);

  const x = displayState.point.x;
  const y = displayState.point.y;
  const ioKind = displayState.ladderRecordData[y].ladderData[x].ladderNode.info;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIoType(e.target.value)
    ioKindChangeFunc(e.target.value);
  }

  useEffect(() => {
    if ( ioKind === "vrA" || ioKind === "vrB" || ioKind === "vrio" ) {
      setIoType("vrio");
    } else
    if ( ioKind === "gpA" || ioKind === "gpB" || ioKind === "gpio" ) {
      setIoType("gpio");
    }
  }, [ioKind, setIoType])

  return (
    <AreaParent>
      <IoSelect value={ioType} onChange={handleChange}>
        <IoOption value=""></IoOption>
        <IoOption value="vrio">vrio</IoOption>
        <IoOption value="gpio">gpio</IoOption>
      </IoSelect>
    </AreaParent>
  )
}

export default IoTypeSetting