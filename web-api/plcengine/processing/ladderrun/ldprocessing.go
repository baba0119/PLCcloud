package ladderrun

import (
	"plc-web-api/plcengine/datamodel/ldexemodel"
	"plc-web-api/plcengine/datamodel/vrgpiomodel"
	"fmt"
)

// ---------------------------------------------
// この関数でブロック内の処理をする
//
// 引数:
//
// ここのラダープログラムを見る
// すべて渡すとこからスタートし、再起処理でブロック
// の階層が増えても処理
// blockLdSlice:	[]*ldexemodel.InputLdModel
//
// この二つの引数から状態を参照する
// opStateSlice:	map[string]*ldexemodel.OutputLdexeModel
// vrgpio:				map[string]*vrgpiomodel.VRgpio
//
// 戻り値:bool, bool
// true:	highレベル
// false:	lowレベル
//
// true:	成功
// false:	失敗
// ---------------------------------------------
func BlockInnerProcessing(
	blockLdSlice	[]*ldexemodel.InputLdModel,
	opStateSlice	map[string]*ldexemodel.OutputLdexeModel,
	vrgpio				map[string]*vrgpiomodel.VRgpio,
) (bool, bool) {
	// ブロックの演算結果
	var BrockOp bool
	// 行ごとの演算結果
	var recordOp []bool

	recordOp = append(recordOp, true)
	// 現在の行のインデックス
	recordNum := 0

	// ブロックの各行内の演算
	for i := 0; len(blockLdSlice) > i; i++ {

		// 行の始端が来た時の処理
		if blockLdSlice[i].IsColSp {
			recordOp = append(recordOp, true)
			recordNum++
		}

		switch {
		// ブロック始端だったら
		case blockLdSlice[i].NodeType == "blockSp":
			// ブロック始端から終端を抽出
			spIndex := i
			epIndex, result := GetBlockEp(blockLdSlice[spIndex:])
			// もし処理に失敗したら
			if !result {
				fmt.Println("end point not found.")
				return false, false
			}

			// ブロック内演算処理
			outCome, result := BlockInnerProcessing(
				blockLdSlice[spIndex + 1:epIndex + 1],
				opStateSlice,
				vrgpio,
			)
			// もし処理に失敗したら
			if !result {
				fmt.Println("processing missed.")
				return false, false
			}

			i = epIndex // ラダーの処理位置をブロック終端へ移動
			recordOp[recordNum] = recordOp[recordNum] && outCome

		// 仮想普通入力だったら
		case blockLdSlice[i].NodeType == "vrA":
			recordOp[recordNum] = recordOp[recordNum] && opStateSlice[blockLdSlice[i].NodeName].State

		case blockLdSlice[i].NodeType == "vrB":
			recordOp[recordNum] = recordOp[recordNum] && !opStateSlice[blockLdSlice[i].NodeName].State

		// gpio入力だったら
		case blockLdSlice[i].NodeType == "gpA":
			recordOp[recordNum] = recordOp[recordNum] && vrgpio[blockLdSlice[i].NodeName].GpioState
			// fmt.Printf("%v %v\n", blockLdSlice[i].NodeName, recordOp[recordNum])

		case blockLdSlice[i].NodeType == "gpB":
			recordOp[recordNum] = recordOp[recordNum] && !vrgpio[blockLdSlice[i].NodeName].GpioState
			// fmt.Printf("%v %v\n", blockLdSlice[i].NodeName, recordOp[recordNum])
		}
	}

	// ブロックの各行どうしの演算
	for _, op := range recordOp {
		BrockOp = BrockOp || op // or演算
	}
	return BrockOp, true
}

// ---------------------------------------------
// この関数でブロック始端が来たときの処理をする
// ブロック終端の添え字を返す
//
// 引数:
// blockLdSlice:	[s:]*ldexemodel.InputLdexeModel
//
// 戻り値:int, bool
// epIndex:	ブロック終端の添え字
//
// true:	成功
// false:	失敗
// ---------------------------------------------
func GetBlockEp(blockLdSlice []*ldexemodel.InputLdModel) (int, bool) {
	for i, ld := range blockLdSlice {
		if ld.NodeType == "blockEp" {
			return i, true
		}
	}
	return 0, false
}