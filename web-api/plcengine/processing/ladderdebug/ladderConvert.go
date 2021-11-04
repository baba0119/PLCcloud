package ladderdebug

import "plc-web-api/plcengine/datamodel/debugmodels"

func LadderConvert(
	ladder interface{},
	IOpointSlice []*debugmodels.IOpointFlame,
) {
	// ------------------------------------
	// この関数で扱うデータ
	//
	// 前のx 今のx
	// 非構造化ラダー
	// 入出力座標群
	// ------------------------------------

	// 入出力座標のまとまったスライスを for range で回す
	for _, IOpoints := range IOpointSlice {
		// -- 出力キーの作成 --
		// 出力座標の取り出し
		opX := IOpoints.OutputPoint.X
		opY := IOpoints.OutputPoint.Y

		// 出力キー作成
		

		// -- 入力キーの作成 --
	}

	// 入出力座標スライスと非構造化ラダーで実行用ラダーの生成
	// 分岐単が来たとき or 着てないときで分岐
	// 分岐単が来た時 -> isColState のどちらかが true

	// 分岐端が来た時
	// 並行しているノードの確認
	// あったときにブロック端挿入、ブロック内処理

	// ブロック端の挿入
	// 3つ戻ってブロック端の挿入

}