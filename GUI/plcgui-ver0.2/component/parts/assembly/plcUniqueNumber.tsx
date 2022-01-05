import { VFC } from "react";
import styled from "styled-components";
import ConsoleDisplayFlame from "../flame/consoleDisplayFlame";

const AreaParent = styled.div`
  width: 100%;
`;

const PLCUniqueNumber: VFC = () => {
  // 一番最初にapiのコール
  // 識別idの取得
  return (
    <AreaParent>
      <ConsoleDisplayFlame
        texts="PLC識別番号"
        Component={() => (
          <p></p>
        )}
      />
    </AreaParent>
  )
}

export default PLCUniqueNumber