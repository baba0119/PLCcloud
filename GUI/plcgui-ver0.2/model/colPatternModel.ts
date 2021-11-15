// 縦列接続のパターン
export type colPatternModel = {
  around: "right" | "left" | "both";
  col: "up" | "low";
}

export type colSettingModel = {
 colPattern: colPatternModel
 isCol: boolean
}