import { useEffect, useState, VFC } from "react";
import styled from "styled-components";
import { END_POINT } from "../../../../utils/endpoint";
import SaveButtonPanel from "./detailes/saveButtonPanel";
import SendButton from "./detailes/sendButton";

const AreaParent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ProjectTitleArea = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4em;
  color: #414141;
  margin-left: 16px;
  margin-right: 36px;
`;

const SomeButtonArea = styled.div`
  width: 8%;
  height: 100%;
`;

const TopMonitor: VFC = () => {
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const projectid = sessionStorage.getItem("projectid") as string;
    const endpoint = END_POINT + `/ladder?projectid=${projectid}`;
    fetch(endpoint, {
      method: "GET",
      mode: "cors",
      credentials: 'include',
    }).then(res => {
      if (!res.ok) {
        console.log("サーバーエラー");
        return
      }
      return res.json()
    }).then(res => {
      console.log(res)
      setProjectName(res.Name);
    }).catch(error => {
      console.log("通信失敗");
    })
  }, [])

  return (
    <AreaParent>
      <ProjectTitleArea>
        <ProjectTitle>{projectName}</ProjectTitle>
      </ProjectTitleArea>
      <SomeButtonArea>
        <SaveButtonPanel/>
      </SomeButtonArea>
      <SomeButtonArea>
        <SendButton/>
      </SomeButtonArea>
    </AreaParent>
  )
}

export default TopMonitor