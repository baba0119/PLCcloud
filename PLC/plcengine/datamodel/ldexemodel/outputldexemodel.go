package ldexemodel

// 出力保持構造体
// gpioが出力先の場合はここにはない
// マップスライスに要素はポインターで実装する
type OutputLdexeModel struct {

	// 出力の種類
	// vrio:	仮想入出力
	// c:			カウンター
	// t:			タイマー
	NodeType	string

	// 出力の状態を表す
	// true:	電圧highレベル
	// false:	電圧lowレベル
	State			bool
}