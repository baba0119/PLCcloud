import { useEffect, useState, VFC } from "react";
import styled from "styled-components";
import { END_POINT } from "../../../utils/endpoint";
import ConsoleDisplayFlame from "../flame/consoleDisplayFlame";

const AreaParent = styled.div`
  width: 100%;
`;

const PlcIdTextAreaParent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const PlcIdText = styled.p`
  font-size: 20px;
  color: #444444;
`;

const PLCUniqueNumber: VFC = () => {
  const [plcId, setPlcId] = useState("");

  // 一番最初にapiのコール
  // 識別idの取得
  useEffect(() => {
    const projectid = sessionStorage.getItem("projectid") as string;
    const endpoint = END_POINT + `/plcid?projectid=${projectid}`;
    fetch(endpoint, {
      method: "GET",
      mode: "cors",
      credentials: 'include',
    }).then(res => {
      if (!res.ok) {
        console.log("サーバーエラー");
        return
      }
      return res.text()
    }).then(res => {
      console.log(res)
      setPlcId(res as string);
    }).catch(error => {
      console.log("通信失敗");
    })
  }, [])

  return (
    <AreaParent>
      <ConsoleDisplayFlame
        texts="PLC識別番号"
        Component={() => (
          <PlcIdTextAreaParent>
            <PlcIdText>
              {plcId}
            </PlcIdText>
          </PlcIdTextAreaParent>
        )}
      />
    </AreaParent>
  )
}

export default PLCUniqueNumber