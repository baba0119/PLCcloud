import { useContext, VFC } from "react";
import styled from "styled-components";
import { LadderDisplayContext } from "../../../../../contexts/models/ladderDisplayContextModel";
import { END_POINT } from "../../../../../utils/endpoint";

const AreaParent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const SendButtonDedign = styled.button`
  font-size: 1.1rem;
  background-color: #118320;
  color: #d5feff;
  height: 80%;
  width: 94px;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

type LDSendReq = {
  ladder: any;
}

const SendButton: VFC = () => {
  const { displayState } = useContext(LadderDisplayContext);

  const onClickHandler = () => {
    // const projectid = sessionStorage.getItem("projectid") as string
    // const endpoint = END_POINT + `/ld-send?projectid=${projectid}`
    // const sendReqData: LDSendReq = {
    //   ladder: displayState.ladderRecordData
    // }

    // fetch(endpoint, {
    //   method: "POST",
    //   mode: "cors",
    //   credentials: 'include',
    //   body: JSON.stringify(sendReqData),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => {
    //   if (!res.ok) {
    //     console.log("サーバーエラー");
    //     return
    //   }
    //   return res.text()
    // }).then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log("通信失敗");
    // })

    const exportJson: LDSendReq = {
      ladder: displayState.ladderRecordData
    }

    const fileName = 'ld.json';
    const data = new Blob([JSON.stringify(exportJson)], { type: 'text/json' });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', fileName);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <AreaParent>
      <SendButtonDedign onClick={onClickHandler}>DownLoad</SendButtonDedign>
    </AreaParent>
  )
}

export default SendButton