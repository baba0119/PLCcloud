import { useEffect, useState, VFC } from "react";
import styled from "styled-components";
import { END_POINT } from "../../../utils/endpoint";

const AreaParent = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
`;

const NamePrint = styled.h2`
  color: #444444;
`;

const ProjectName: VFC = () => {
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
      <NamePrint>{projectName}</NamePrint>
    </AreaParent>
  )
}

export default ProjectName