package reducer

import (
	"PLC/plcengine/datamodel/vrgpiomodel"
	"PLC/plcengine/processing/gpiooperation/virtualgpio"
	"fmt"
)

// 引数として必要な情報
// - virtual gpio
// - gpio ピンの名前
// - true or false
// ---------------------------------------------
// 引数:
// pin:			string
// output:	bool
// vrgpio:	map[string]*vrgpiomodel.VRgpio
//
// 戻り値:bool
// true:	成功
// false:	失敗
// ---------------------------------------------
func Vrgpio(
	pin			string,
	output	bool,
	vrgpio	map[string]*vrgpiomodel.VRgpio,
) bool {
	if !virtualgpio.VrgpioOutputChange(pin, output, vrgpio) {
		fmt.Println("出力変更失敗")
		return false
	}
	return true
}