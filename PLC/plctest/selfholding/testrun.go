package selfholding

import "PLC/datamodel/ldexemodel"

// 試運転ではmain関数でこの関数を呼び出す
// jsonをマッピングするところは飛ばしている
func SelfholdingRun() {
	// ------------------------------------------
	// 入力部
	// ------------------------------------------
	// ラダープログラムのマッピング
	inputLd1 := []ldexemodel.InputLdModel{
		{ // ブロック始端
			NodeName: "block1",
			NodeType: "blockSp",
			IsColSp:  false,
			IsColEp:  false,
		},
		{ // a1 a接点
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
		{ // b1 b接点
			NodeName: "b1",
			NodeType: "vrB",
			IsColSp:  false,
			IsColEp:  false,
		},
	}

	// ラダープログラムの動作(ループ)
		// 出力dispatcher
}

// 関数に、スライスをそのまま渡すと、この構造体が値コピーされて渡る。
// 内部にデータへのポインタを持っているので、そのまま渡しても参照先の配列
// は同じポインタを示すので、通常は問題ない。