package ldexemodel

// タイマ状態把持構造体
type TimerStateModel struct {
	DelayTime	int
	NowTime		int
}

// カウンタ状態把持構造体
type CounterStateModel struct {
	LimitCount	int
	NowCount		int
	WasState		bool
	Edge				string
}