import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { createDisplayContext } from "../../../../contexts/ladderCreateDisplayProvider";
import { colStateModel } from "../../../../model/ladderDataModel";

const NodeParentStyle = styled.div`
  width: 96px;
  height: 120px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  position: relative;
`;

// ラダー選択中のところの色付け
const NodeSelectStyle = styled.div<{ isChoice: boolean }>`
  margin: 0;
  width: 96px;
  height: 100%;
  outline: ${({ isChoice }) => isChoice ? "4px solid #fdfddf" : "none"};
  outline-offset: -4px;
  position: absolute;
`;

// ラダーの接点の表示スペース
const LadderNodePrint = styled.div`
  width: 95px;
  height: 100%;
`;

// ラダーの上下接続線
const LadderConnection = styled.div`
  width: 1px;
  height: 100%;
  position: relative;
`;

// boolean の値により色が変わる
// 上と接続する線
const LadderConnectionLineUp = styled.div<{ conn: boolean }>`
  width: 1px;
  height: 50%;
  background-color: ${ ({ conn }) => conn ? "#000000" : "#e9e9e9"};
  position: absolute;
`;
// 下と接続する線
const LadderConnectionLineDown = styled.div<{ conn: boolean }>`
  width: 1px;
  height: 50%;
  background-color: ${ ({ conn }) => conn ? "#000000" : "#e9e9e9"};
  position: absolute;
  top: 50%;
`;

type Props = {
  id: string
  isChoice: boolean
  colState: colStateModel
  x: number
  y: number
}
const NodePrint: FC<Props> = ({
  id,
  colState,
  x,
  y,
  children
}) => {
  const [isChoice, setIsChoice] = useState(false);

  const { state, dispatch } = useContext(createDisplayContext)

  useEffect(() => {
    const xs = state.point.x;
    const ys = state.point.y;

    if ( xs === x && ys === y ) {
      setIsChoice(true);
    } else {
      setIsChoice(false);
    }
  }, [state.point.x, state.point.y, x, y])

  const pointSelect = () => dispatch({
    type: "pointSelect",
    payload: {x: x, y: y}
  })

  return (
    <NodeParentStyle
      key={id}
      onClick={pointSelect}
    >
      <NodeSelectStyle isChoice={isChoice}/>
      <LadderNodePrint>
        {children}
      </LadderNodePrint>
      <LadderConnection>
        <LadderConnectionLineUp conn={colState.isUpCol}/>
        <LadderConnectionLineDown conn={colState.isDownCol}/>
      </LadderConnection>
    </NodeParentStyle>
  )
}

export default NodePrint