package ladderrun

import (
	"PLC/datamodel/ldexemodel"
	"PLC/datamodel/vrgpiomodel"
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

	return true
}