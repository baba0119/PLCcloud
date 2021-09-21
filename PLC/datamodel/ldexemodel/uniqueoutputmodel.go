package ldexemodel

// タイマ状態把持構造体
type TimerStateModel struct {

	// 待ち時間
	DelayTime	int

	// 現在の経過時間
	// ここは時間に応じて変更される
	NowTime		int
}

// カウンタ状態把持構造体
type CounterStateModel struct {

	// 閾値
	LimitCount	int

	// 現在のカウント数
	NowCount		int

	// 一つ前の出力状態
	WasState		bool

	// 立ち上がりをとらえるか立下りをとらえるか
	// down:	立下り
	// up:		立ち上がり
	Edge				string
}

// 特殊出力状態保持構造体
// マップのキーは出力先ノード名
type UniqueOutputStateModel struct {
	// タイマー状態保持スライス
	TimerState		map[string]*TimerStateModel
	// カウンター状態保持スライス
	CounterState	map[string]*CounterStateModel
}