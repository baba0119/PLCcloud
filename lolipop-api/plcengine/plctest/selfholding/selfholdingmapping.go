package selfholding

import "API/plcengine/datamodel/ldexemodel"

func SelfholdingMapping() []*ldexemodel.InputLdexeModel {
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

	return inputLdSlice
}