package selfholding

import (
	"fmt"
	"PLC/datamodel/ldexemodel"
	"PLC/processing/ladderdebug"
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
	inputLd1 := []*ldexemodel.InputLdModel{
		{ // ブロック始端
			NodeName: "block1",
			NodeType: "blockSp",
			IsColSp:  false,
			IsColEp:  false,
		},
		{ // Gpio2 a接点
			NodeName: "Gpio2",
			NodeType: "gpA",
			IsColSp:  true,
			IsColEp:  true,
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
			NodeName: "gpio3",
			NodeType: "gpB",
			IsColSp:  false,
			IsColEp:  false,
		},
	}

	// ラダー出力部
	opKey1 := ldexemodel.OutputKeyModel{
		NodeType: "vrio",
		NodeName: "o1",
	}

	// 2列目
	// ラダー入力部
	inputLd2 := []*ldexemodel.InputLdModel{
		{
			NodeName: "o1",
			NodeType: "vrA",
			IsColSp:  false,
			IsColEp:  false,
		},
	}

	// ラダー出力部
	opKey2 := ldexemodel.OutputKeyModel{
		NodeType: "gpio",
		NodeName: "Gpio3",
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
	// マッピングされた出力部からスライスを生成する
	outputStateSlice := ladderdebug.CreateOutputStateSlice(inputLdSlice)
	fmt.Println(outputStateSlice)

	// ------------------------------------------
	// 仮想gpio関連
	// ------------------------------------------
	// 仮想gpioマッピング
	// 仮想gpio setting
	// 仮想gpio模擬入力機構

	// ラダープログラムの動作(ループ)
		// 出力dispatcher
}

// 関数に、スライスをそのまま渡すと、この構造体が値コピーされて渡る。
// 内部にデータへのポインタを持っているので、そのまま渡しても参照先の配列
// は同じポインタを示すので、通常は問題ない。