import { ChangeEvent, Dispatch, SetStateAction, useContext, VFC } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import { LadderDisplayContext } from "../../../../../contexts/models/ladderDisplayContextModel";
import { gpioList } from "../entity/pinName";
import { IoOption, IoSelect } from "../entity/selectBoxStyles";

const AreaParent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  ioName: string
  ioType: string
  setIoName: Dispatch<SetStateAction<string>>
}
const IoNameSetting: VFC<Props> = ({
  ioName,
  ioType,
  setIoName
}) => {
  return (
    <AreaParent>
      {( ioType === "gpio" ? (
        <GpioSelectBox/>
      ) : (
        <VrioNameSettingBox/>
      ))}
    </AreaParent>
  )
}

const VrioNameInput = styled.input`
  border: #5e5e5e 2px solid;
  padding: 2px;
  margin: 8px 0 8px 0;
  font-size: 1em;
  width: 80%;
`;

const VrioNameSettingBox: VFC = () => {
  const { displayState, nodeNameUpdateFunc }  = useContext(LadderDisplayContext);

  const x = displayState.point.x;
  const y = displayState.point.y;

  const nodeName = displayState.ladderRecordData[y].ladderData[x].ladderNode.name;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    nodeNameUpdateFunc(e.target.value)

  return (
    <VrioNameInput
      value={nodeName}
      onChange={handleChange}
    />
  )
}

const GpioSelectBox: VFC = () => {
  const { displayState, nodeNameUpdateFunc }  = useContext(LadderDisplayContext);

  const x = displayState.point.x;
  const y = displayState.point.y;

  const nodeName = displayState.ladderRecordData[y].ladderData[x].ladderNode.name;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    nodeNameUpdateFunc(e.target.value)

  return (
    <IoSelect value={nodeName} onChange={handleChange}>
      {gpioList.map(gpio => (
        <IoOption key={uuidv4()} value={gpio}>{gpio}</IoOption>
      ))}
    </IoSelect>
  )
}

export default IoNameSetting