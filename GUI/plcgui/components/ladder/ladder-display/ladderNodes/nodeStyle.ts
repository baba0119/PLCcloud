// -- スタイル --
// ノードの親要素
import styled from "styled-components";

export const NodeParentStyle = styled.div`
  width: 96px;
  height: 120px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
`;

// ラダーの接点の表示スペース
export const LadderNodePrint = styled.div`
  width: 95px;
  height: 100%;
`;

// ラダーの上下接続線
export const LadderConnection = styled.div`
  width: 1px;
  height: 100%;
  position: relative;
`;

// boolean の値により色が変わる
// 上と接続する線
export const LadderConnectionLineUp = styled.div<{ conn: boolean }>`
  width: 1px;
  height: 50%;
  background-color: ${ ({ conn }) => conn ? "#000000" : "#e9e9e9"};
  position: absolute;
`;
// 下と接続する線
export const LadderConnectionLineDown = styled.div<{ conn: boolean }>`
  width: 1px;
  height: 50%;
  background-color: ${ ({ conn }) => conn ? "#000000" : "#e9e9e9"};
  position: absolute;
  top: 50%;
`;