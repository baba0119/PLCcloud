package ldexemodel

// ===========================================================
// 型定義
// -----------------------------------------------------------
// - 入力部ラダー構造体
// - 出力キー構造体
// - 入力処理で使う構造体
// ===========================================================

// 入力部ラダー構造体
type InputLdModel struct {

	// ノードの名前をここに入れる
	// C1
	// C:カウンター 1:カウンターの中の識別子
	// このように付けるのがbetter
	NodeName	string

	// ノードの情報(種類)をここに入力する
	// vrA:			仮想a接点
	// vrB:			仮想b接点
	// gpA:			GPIOa接点
	// gpB:			GPIOb接点
	// blockSp:	ブロック始端
	// blockEp:	ブロック終端
	// これらのどれかが入る
	// TypeScript の union ほしい (´・ω・｀)
	NodeType	string

	// ブロック始端
	IsColSp		bool

	// ブロック終端
	IsColEp		bool
}

// 出力キー構造体
type OutputKeyModel struct {

	// ノードの種類
	// ここの値によって処理が分かれる
	// 取りうる値
	// gpio:	汎用入出力
	// vrio:	仮想入出力
	// c:			カウンター
	// t:			タイマー
	// TypeScript の union ほしい (´・ω・｀)
	NodeType	string

	// ノードの名前
	// 入力のノードネームとどこかで一致する値
	NodeName	string
}

// 入力処理で使う構造体
type InputLdexeModel struct {
	InputLd		[]InputLdModel
	OutputKey	OutputKeyModel
}

// ===========================================================
// フィールド別データチェック
// -----------------------------------------------------------
// 適切な値を入れるために、この関数を介して値を代入する
// ===========================================================
// 入力部ラダーのとき
func (ld *InputLdModel) NodeTypeDataCheck(str string) bool {
	if	str == "vrA" || str == "vrB" ||
			str == "gpA" || str == "gpB" ||
			str == "blockSp" || str == "blockEp" {
		ld.NodeType = str
		return true
	} else {
		return false
	}
}

// 出力キーのとき
func (ld *OutputKeyModel) NodeTypeDataCheck(str string) bool {
	if str == "gpio" || str == "vrio" || str == "c" || str == "t" {
		ld.NodeType = str
		return true
	} else {
		return false
	}
}