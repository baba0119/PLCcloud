import { VFC } from "react";
import styled from "styled-components";

const PanelArea = styled.div`
  width: 59px;
`;

type Props = {
  side: "left" | "right"
}
const ColSettingPanel: VFC<Props> = ({ side }) => {

  return (
    <PanelArea></PanelArea>
  );
}

export default ColSettingPanel;