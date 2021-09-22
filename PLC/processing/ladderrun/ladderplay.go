package ladderrun

import (
	"PLC/datamodel/ldexemodel"
	"PLC/datamodel/vrgpiomodel"
	"fmt"
)

// ---------------------------------------------
// この関数から出力処理が始まる
//
// 引数:
// inputLdSlice:	[]*ldexemodel.InputLdexeModel
// opStateSlice:	map[string]*ldexemodel.OutputLdexeModel
// vrgpio:				map[string]*vrgpiomodel.VRgpio
// uniquiOpSlice:	*UniqueOutputStateModel(まだ実装しない)
//
// 引数はソフトウェアで欠かせないエンティティをすべて
// 受け取る
//
// 戻り値:bool
// true:	成功
// false:	失敗
// ---------------------------------------------
func LadderPlay(
	inputLdSlice 	[]*ldexemodel.InputLdexeModel,
	opStateSlice 	map[string]*ldexemodel.OutputLdexeModel,
	vrgpio				map[string]*vrgpiomodel.VRgpio,
	// uniquiOpSlice	*ldexemodel.UniqueOutputStateModel,
) bool {
	// var ldop bool
	// for {
		for _, ld := range inputLdSlice {
			// ラダープログラム処理 ture or false return
			outCome, result := BlockInnerProcessing(
				ld.InputLd[:],
				opStateSlice,
				vrgpio,
			)
			// もし処理に失敗したら
			if !result {
				fmt.Println("processing missed.")
				return false
			}
			// 出力dispatcher 呼出し
			fmt.Println(outCome)
		}
	// }
	return false
}