package ladderrun

import (
	"PLC/datamodel/ldexemodel"
	"PLC/datamodel/vrgpiomodel"
	"PLC/processing/ladderrun/reducer"
	"fmt"
)

// ---------------------------------------------
// 出力処理のdispatcher
// この関数から出力処理が始まる
//
// 引数:
// ldResult:			bool
// ldOutputKey:		OutputKeyModel
// opStateSlice:	map[string]*ldexemodel.OutputLdexeModel
// vrgpio:				map[string]*vrgpiomodel.VRgpio
//
// 戻り値:bool
// true:	成功
// false:	失敗
// ---------------------------------------------
func Dispatcher(
	ldResult			bool,
	ldOutputKey		ldexemodel.OutputKeyModel,
	opStateSlice	map[string]*ldexemodel.OutputLdexeModel,
	vrgpio				map[string]*vrgpiomodel.VRgpio,
) bool {
	// 出力参照先種別ごと分岐
	// 出力先種別
	// gpio:	汎用入出力
	// vrio:	仮想入出力
	// c:			カウンター
	// t:			タイマー
	switch ldOutputKey.NodeType {

	case "gpio": // vrgpio へ働きかける
		// 必要な情報
		// - virtual gpio
		// - gpio ピンの名前
		// - true or false
		if !reducer.Vrgpio(ldOutputKey.NodeName, ldResult, vrgpio) {
			fmt.Println(ldOutputKey.NodeName)
			return false
		}

	case "vrio": // opStateSlice へ働きかける
		// 必要な情報
		// - 出力保持スライス
		// - vrio マップのキー
		// - true or false
		if !reducer.OutputSlice(ldOutputKey.NodeName, ldResult, opStateSlice) {
			return false
		}
	}

	return true
}