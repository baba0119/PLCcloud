// 縦の接続の表現
export type colStateModel = {
  isUpCol: boolean,
  isDownCol: boolean
}

// ラダーの各接点本体の情報
export type ladderNodeModel = {
  id: number,
  name: string,
  info: "contact" | "a" | "b" | "relay"
  attr: "timer" | "counter" | ""
  attrInfo: timerDataModel | counterDataModel
}

// タイマーの情報格納
// on -> オンディレイタイマ
// off -> オフディレイタイマ
type timerDataModel = {
  info: "on" | "off"
  delay: number
}

// カウンターの情報格納
// rising -> 立ち上がり
// falling -> 立下り
type counterDataModel = {
  count: number,
  edge: "rising" | "falling"
}