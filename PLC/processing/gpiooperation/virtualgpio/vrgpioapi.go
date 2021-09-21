package virtualgpio

import (
	"PLC/datamodel/vrgpiomodel"
	"strconv"
)

// ---------------------------------------------
// virtual gpio のモードを変更する関数
//
// 引数:
// num:			GPIO番号
// mode:		inputかoutputか
// vrgpio:	vrgpioのポインター
//
// 戻り値:bool
// true:	成功
// false:	失敗
//
// ladderdebug がこの関数を使う
// ---------------------------------------------
func VrgpioModeChange(pin string, mode string, vrgpio map[string]*vrgpiomodel.VRgpio) bool {
	// モードが正しい値かチェック
	if mode != "output" && mode != "input" {
		return false
	}

	// gpio が実在するかチェック
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		if pin == str {
			vrgpio[pin] = &vrgpiomodel.VRgpio{
				GpioMode: mode,
				GpioState: vrgpio[pin].GpioState,
			}
			return true
		}
	}

	return false
}

// ---------------------------------------------
// virtual gpio の出力を変更する関数
//
// 引数:
// num:			GPIO番号
// output:	true か false か
// vrgpio:	vrgpioのポインター
//
// 戻り値:bool
// true:	成功
// false:	失敗
//
// ladderdebug がこの関数を使う
// ---------------------------------------------
func VrgpioOutputChange(pin string, op bool, vrgpio map[string]*vrgpiomodel.VRgpio) bool {
	// gpio が実在するかチェック
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		if pin == str {
			vrgpio[pin] = &vrgpiomodel.VRgpio{
				GpioMode: vrgpio[pin].GpioMode,
				GpioState: op,
			}
			return true
		}
	}

	return false
}

// ---------------------------------------------
// virtual gpio の入力を変更する関数
//
// 引数:
// gpio:		GPIO番号
// input:		true か false か
// vrgpio:	vrgpioのポインター
//
// 戻り値:bool
// true:	成功
// false:	失敗
//
// ladderdebug がこの関数を使う
// ---------------------------------------------
func VrgpioInputChange(
	gpio string,
	input bool,
	vrgpio map[string]*vrgpiomodel.VRgpio,
) bool {
	// gpio が実在するかチェック
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		if gpio == str || vrgpio[str].GpioMode == "input" {
			vrgpio[gpio] = &vrgpiomodel.VRgpio{
				GpioMode: vrgpio[gpio].GpioMode,
				GpioState: input,
			}
			return true
		}
	}

	return false
}