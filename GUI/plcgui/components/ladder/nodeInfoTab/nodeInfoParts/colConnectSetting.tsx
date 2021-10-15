import { VFC } from "react";
import styled from "styled-components";
import ColSettingPanel from "./colConnectItem/colSettingPanel";
import ColStateDisplay from "./colConnectItem/colStateDisplay";

const ColSetTitle = styled.h3`
  color: #4e4e4e;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const ColSetDisplayArea = styled.div`
  display: flex;
  width: 200px;
  height: 140px;
  padding: 20px 0;
  margin: 16px auto 0 auto;
  background-color: #fefefe;
`;



const ColConnectSetting: VFC = () => {
  return (
    <>
      <ColSetTitle>接点の接続</ColSetTitle>
      <ColSetDisplayArea>
        <ColSettingPanel side="right"></ColSettingPanel>
        <ColStateDisplay></ColStateDisplay>
        <ColSettingPanel side="left"></ColSettingPanel>
      </ColSetDisplayArea>
    </>
  )
}

export default ColConnectSetting