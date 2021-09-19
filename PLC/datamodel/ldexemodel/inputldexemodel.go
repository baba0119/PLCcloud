package ldexemodel

// 入力部ラダー構造体
type inputLd struct {

	// ノードの名前をここに入れる
	// C1
	// C:カウンター 1:カウンターの中の識別子
	// このように付けるのがbetter
	NodeName	string

	// ノードの情報(種類)をここに入力する
	// A:				a接点
	// B:				b接点
	// blockSp:	ブロック始端
	// blockEp:	ブロック終端
	// これらのどれかが入る
	// TypeScript の union ほしい (´・ω・｀)
	NodeInfo	string

	// ブロック始端
	IsColSp		bool

	// ブロック終端
	IsColEp		bool
}

// 出力キー構造体
type outputKey struct {

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
type InputLdexeMode struct {
	InputLd		[]inputLd
	OutputKey	outputKey
}