package virtualgpio

import (
	"PLC/datamodel/vrgpiomodel"
)

// ---------------------------------------------
// virtual gpio のモードを変更する関数
//
// 引数:
// num:			GPIO番号
// mode:		inputかoutputか
// vrgpio:	vrgpioのポインター
//
// ladderdebug がこの関数を使う
// ---------------------------------------------
func VrgpioModeChange(pin string, mode string, vrgpio map[string]*vrgpiomodel.VRgpio) {
	vrgpio[pin] = &vrgpiomodel.VRgpio{
		GpioMode: mode,
		GpioState: vrgpio[pin].GpioState,
	}
}

// ---------------------------------------------
// virtual gpio の出力を変更する関数
//
// 引数:
// num:			GPIO番号
// output:	true か false か
// vrgpio:	vrgpioのポインター
//
// ladderdebug がこの関数を使う
// ---------------------------------------------
func VrgpioOutputChange(pin string, op bool, vrgpio map[string]*vrgpiomodel.VRgpio) {
	vrgpio[pin] = &vrgpiomodel.VRgpio{
		GpioMode: vrgpio[pin].GpioMode,
		GpioState: op,
	}
}
