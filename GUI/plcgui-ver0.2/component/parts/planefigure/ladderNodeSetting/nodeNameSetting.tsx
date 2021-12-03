import { useState, VFC } from "react";
import styled from "styled-components";
import IoNameSetting from "./details/ioNameSetting";
import IoTypeSetting from "./details/ioTypeSetting";

const AreaParent = styled.div`
  width: 100%;
`;

const SettingTitle = styled.h3`
  color: #4e4e4e;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const NodeNameSetting: VFC = () => {
  const [ioName, setIoName] = useState("");
  const [ioType, setIoType] = useState("");

  return (
    <AreaParent>
      <SettingTitle>接点の種類</SettingTitle>
      <IoTypeSetting
        ioType={ioType}
        setIoType={setIoType}
      />
      <SettingTitle>接点の名前</SettingTitle>
      <IoNameSetting
        ioName={ioName}
        ioType={ioType}
        setIoName={setIoName}
      />
    </AreaParent>
  )
}

export default NodeNameSetting