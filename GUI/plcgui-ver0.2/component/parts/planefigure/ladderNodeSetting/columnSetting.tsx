import { VFC } from "react";
import styled from "styled-components";
import ColSettingPanel from "./details/colSettingPanel";
import ColumnStateDisplay from "./details/columnStateDisplay";

const AreaParent = styled.div`
  width: 100%;
`;

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

const ColumnSetting: VFC = () => {
  return (
    <AreaParent>
      <ColSetTitle>接点の接続</ColSetTitle>
      <ColSetDisplayArea>
        <ColSettingPanel side="left"></ColSettingPanel>
        <ColumnStateDisplay/>
        <ColSettingPanel side="right"></ColSettingPanel>
      </ColSetDisplayArea>
    </AreaParent>
  )
}

export default ColumnSetting