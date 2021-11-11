// 縦の接続の表現
export type colStateModel = {
  isUpCol: boolean
  isDownCol: boolean
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
  count: number
  edge: "rising" | "falling"
}

// ノードの種類の大別
export type KindsModel =
  "contact" |
  "vrA" | "vrB" |
  "gpA" | "gpB" |
  "vrio" | "gpio" |
  ""

// ラダーの各接点本体の情報
export type ladderNodeModel = {
  name: string
  info: KindsModel
  attr: "timer" | "counter" | ""
  attrInfo: timerDataModel | counterDataModel | null
}

// ラダープログラムを格納する構造体
export type ladderDataModel = {
  id: string
  isProof: boolean
  isChoice: boolean
  colState: colStateModel
  ladderNode: ladderNodeModel
}

// ラダープログラムを格納する構造体 - レコードごとのid追加
export type ladderRecordDataModel = {
  id: string
  ladderData: ladderDataModel[]
}