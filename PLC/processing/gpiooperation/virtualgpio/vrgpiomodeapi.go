package virtualgpio

import (
	"PLC/datamodel/vrgpiomodel"
)

// ---------------------------------------------
// virtual gpio のモードを変更する関数
// 引数:	num:		GPIO番号
// 				mode:		inputかoutputか
// 				vrgpio:	vrgpioのポインター
// ---------------------------------------------
func VrgpioModeChange(pin string, mode string, vrgpio map[string]*vrgpiomodel.VRgpio) {
	vrgpio[pin] = &vrgpiomodel.VRgpio{
		GpioMode: mode,
		GpioState: vrgpio[pin].GpioState,
	}
}