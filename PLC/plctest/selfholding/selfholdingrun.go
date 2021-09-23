package selfholding

import (
	"PLC/datamodel/ldexemodel"
	"PLC/plctest"
	"PLC/processing/gpiooperation/virtualgpio"
	"PLC/processing/ladderdebug"
	"PLC/processing/ladderrun"
	"fmt"
	"sync"
)

// 試運転ではmain関数でこの関数を呼び出す
// jsonをマッピングするところは飛ばしている
func SelfholdingRun() {

	// ------------------------------------------
	// 入力部データマッピング
	// ------------------------------------------
	// ラダープログラムのマッピング

	// 1列目
	// ラダー入力部
	inputLd1 := []*ldexemodel.InputLdModel {
		{ // ブロック始端
			NodeName: "block1",
			NodeType: "blockSp",
			IsColSp:  false,
			IsColEp:  false,
		},
		{ // Gpio2 a接点
			NodeName: "Gpio2",
			NodeType: "gpA",
			IsColSp:  false,
			IsColEp:  false,
		},
		{ // o1 a接点
			NodeName: "o1",
			NodeType: "vrA",
			IsColSp:  true,
			IsColEp:  true,
		},
		{ // ブロック終端
			NodeName: "block1",
			NodeType: "blockEp",
			IsColSp:  false,
			IsColEp:  false,
		},
		{ // gpio b接点
			NodeName: "Gpio3",
			NodeType: "gpB",
			IsColSp:  false,
			IsColEp:  false,
		},
	}

	// ラダー出力部
	opKey1 := ldexemodel.OutputKeyModel {
		NodeType: "vrio",
		NodeName: "o1",
	}

	// 2列目
	// ラダー入力部
	inputLd2 := []*ldexemodel.InputLdModel {
		{
			NodeName: "o1",
			NodeType: "vrA",
			IsColSp:  false,
			IsColEp:  false,
		},
	}

	// ラダー出力部
	opKey2 := ldexemodel.OutputKeyModel {
		NodeType: "gpio",
		NodeName: "Gpio4",
	}

	// 入力部ラダースライス生成
	inputLdSlice := []*ldexemodel.InputLdexeModel {
		{
			InputLd:   inputLd1,
			OutputKey: opKey1,
		},
		{
			InputLd:   inputLd2,
			OutputKey: opKey2,
		},
	}

	// ------------------------------------------
	// 出力部データスライスマッピング
	// ------------------------------------------
	var ClientMutex struct {
		sync.Mutex
	}
	// マッピングされた出力部からスライスを生成する
	outputStateSlice := ladderdebug.CreateOutputStateSlice(inputLdSlice)

	// 出力保持スライスの確認
	ClientMutex.Lock()  // ロック
	fmt.Println("\n出力保持スライス生成直後")
	fmt.Printf("o1,\nNodeType=%v\nState=%v\n\n",
		outputStateSlice["o1"].NodeType,
		outputStateSlice["o1"].State,
	)
	ClientMutex.Unlock() // アンロック

	// ------------------------------------------
	// 仮想gpio関連
	// ------------------------------------------
	// 仮想gpioマッピング
	vrgpio := virtualgpio.VirtualGpioMapping()

	ClientMutex.Lock()  // ロック
	// 仮想gpio setting
	if !virtualgpio.VrgpioSetting(inputLdSlice, vrgpio) {
		fmt.Println("gpio setting missed.")
		return
	}
	// gpio設定変更確認
	fmt.Println("virtual gpio 初期状態")
	virtualgpio.ShowVirtualGpio(vrgpio)
	fmt.Println()
	ClientMutex.Unlock() // アンロック

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