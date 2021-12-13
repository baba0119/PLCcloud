package selfholding

import (
	"PLC/plcengine/plctest"
	"PLC/plcengine/processing/gpiooperation/virtualgpio"
	"PLC/plcengine/processing/ladderdebug"
	"PLC/plcengine/processing/ladderrun"
	"fmt"
)

// 試運転ではmain関数でこの関数を呼び出す
// jsonをマッピングするところは飛ばしている
func SelfholdingRun() {
	// ------------------------------------------
	// 入力部データマッピング
	// ------------------------------------------
	// 入力部ラダースライス生成
	inputLdSlice := SelfholdingMapping()

	// ------------------------------------------
	// 出力部データスライスマッピング
	// ------------------------------------------
	// マッピングされた出力部からスライスを生成する
	outputStateSlice := ladderdebug.CreateOutputStateSlice(inputLdSlice)

	// 出力保持スライスの確認
	fmt.Println("\n出力保持スライス生成直後")
	fmt.Printf("o1,\nNodeType=%v\nState=%v\n\n",
		outputStateSlice["o1"].NodeType,
		outputStateSlice["o1"].State,
	)

	// ------------------------------------------
	// 仮想gpio関連
	// ------------------------------------------
	// 仮想gpioマッピング
	vrgpio := virtualgpio.VirtualGpioMapping()
	// 仮想gpio setting
	if !virtualgpio.VrgpioSetting(inputLdSlice, vrgpio) {
		fmt.Println("gpio setting missed.")
		return
	}
	// gpio設定変更確認
	fmt.Println("virtual gpio 初期状態")
	virtualgpio.ShowVirtualGpio(vrgpio)
	fmt.Println()

	// 仮想gpio模擬入力機構
	// 実行中はコマンドプロンプトからGpioの入力を変更できる
	// input モードのとこのみ変更可能
	// ゴルーチンで処理を動かす
	done := make(chan bool)
	go plctest.VrgpioSimulated(done, vrgpio)

	// ラダープログラムの動作(無限ループ)
	// ラダープレイの中で無限ループ
	if !ladderrun.LadderPlay(
		done,							// ゴルーチンチャネル
		inputLdSlice,			// 入力部ラダースライス
		outputStateSlice,	// 出力保持スライス
		vrgpio,						// virtual gpio
	) {
		fmt.Println("processing missed.")
		return
	}

	// エラー状況
	// plctest.VrgpioSimulated(vrgpio)
	// ladderrun.LadderPlay()
	// これらでmapへのアクセスが重複する
}


// 関数に、スライスをそのまま渡すと、この構造体が値コピーされて渡る。
// 内部にデータへのポインタを持っているので、そのまま渡しても参照先の配列
// は同じポインタを示すので、通常は問題ない。