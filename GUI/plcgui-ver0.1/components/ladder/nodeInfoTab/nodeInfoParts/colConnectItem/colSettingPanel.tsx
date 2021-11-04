import { useContext, VFC } from "react";
import styled from "styled-components";
import { ladderDisplayContext } from "../../../../../model/ladderDisplayContextModel";
import { colSettingModel, NodeInfoContext } from "../../../../../model/nodeInfoContextModel";

const PanelArea = styled.div`
  width: 59px;
`;

const ButtonAreaParent = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColSetButton = styled.button`
  width: 40px;
  text-align: center;
  padding: 0;
`;

type Props = {
  side: "left" | "right"
}
const ColSettingPanel: VFC<Props> = ({ side }) => {
  const { displayState } = useContext(ladderDisplayContext);
  const { colSetting } = useContext(NodeInfoContext);

  let x = displayState.point.x;
  let y = displayState.point.y;

  if ( side === "left") {
    x--;
  }

  const isUpCol = ( x >= 0 ? (
    displayState.ladderRecordData[y].ladderData[x].colState.isUpCol
  ) : ( false ));
  const upColSetting: colSettingModel = {
    colPattern: {
      around: side,
      col: "up"
    },
    isCol: !isUpCol
  }

  const isDownCol = ( x >= 0 ? (
    displayState.ladderRecordData[y].ladderData[x].colState.isDownCol
  ) : ( false ));
  const DownColSetting: colSettingModel = {
    colPattern: {
      around: side,
      col: "low"
    },
    isCol: !isDownCol
  }

  return (
    <PanelArea>
      <ButtonAreaParent>
        {( x < 0 ? (
          <div></div>
        ) : (
          <ColSetButton onClick={() => colSetting(upColSetting)}>
            {( isUpCol ? "del" : "conn")}
          </ColSetButton>
        ))}
      </ButtonAreaParent>
      <ButtonAreaParent>
        {( x < 0 ? (
          <div></div>
        ) : (
          <ColSetButton onClick={() => colSetting(DownColSetting)}>
            {( isDownCol ? "del" : "conn")}
          </ColSetButton>
        ))}
      </ButtonAreaParent>
    </PanelArea>
  );
}

export default ColSettingPanel;