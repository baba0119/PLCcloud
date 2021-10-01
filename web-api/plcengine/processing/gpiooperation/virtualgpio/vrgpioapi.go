package virtualgpio

import (
	"lolipop-api/plcengine/datamodel/vrgpiomodel"
	"strconv"
	"sync"
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
	var ClientMutex struct {
		sync.Mutex
	}
	// モードが正しい値かチェック
	if mode != "output" && mode != "input" {
		return false
	}

	// gpio が実在するかチェック
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		if pin == str {
			ClientMutex.Lock()  // ロック
			vrgpio[pin] = &vrgpiomodel.VRgpio{
				GpioMode: mode,
				GpioState: vrgpio[pin].GpioState,
			}
			ClientMutex.Unlock() // アンロック
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
	var ClientMutex struct {
		sync.Mutex
	}

	// gpio が実在するかチェック
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		if pin == str {
			ClientMutex.Lock()  // ロック
			vrgpio[pin] = &vrgpiomodel.VRgpio{
				GpioMode: vrgpio[pin].GpioMode,
				GpioState: op,
			}
			ClientMutex.Unlock()
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
	// mapをゴルーチンでそうさするため排他的に
	// lock/unlockする必要があった
	var ClientMutex struct {
		sync.Mutex
	}

	// gpio が実在するかチェック
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		ClientMutex.Lock()  // ロック
		if gpio == str || vrgpio[str].GpioMode == "input" {
			vrgpio[gpio] = &vrgpiomodel.VRgpio{
				GpioMode: vrgpio[gpio].GpioMode,
				GpioState: input,
			}
			ClientMutex.Unlock() // アンロック
			return true
		}
		ClientMutex.Unlock() // アンロック
	}

	return false
}

// 呼出し
// defer funcname()()

// func funcname() func() {
//
// }