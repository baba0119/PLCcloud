package ldexemodel

// 入力部ラダー構造体
type inputLd struct {
	NodeName	string
	NodeInfo		 string
	Reference		string
	IsColSp				bool
	IsColEp				bool
}

// 出力キー構造体
type outputKey struct {
	NodeType		string
	NodeName	string
}

// 入力処理で使う構造体
type InputLdexeMode struct {
	InputLd			inputLd
	OutputKey	outputKey
}