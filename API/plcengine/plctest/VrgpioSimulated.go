package plctest

import (
	"API/plcengine/datamodel/vrgpiomodel"
	"API/plcengine/processing/gpiooperation/virtualgpio"
	"fmt"
)

// ===========================================================
// virtual gpio を実行中は cmd から操作できるようにする関数
// -----------------------------------------------------------
// 関数名: VrgpioSimulated
//
// - virtual gpio の状態変更
// - virtual gpio の状態読み込み
//
// 標準入力の値によって処理を分岐する
// 処理は上記の二つ
// ===========================================================
func VrgpioSimulated(done chan bool, vrgpio map[string]*vrgpiomodel.VRgpio) {
	fmt.Println("仮想gpio模擬入力機構動作開始")
	var process string
	var vrpin		string
	var state		bool

	// 無限ループ
	for {
		fmt.Scanln(&process)

		// 処理の分岐
		switch {
		case process == "show":
			virtualgpio.ShowVirtualGpio(vrgpio)
			fmt.Println()
		case process == "input":
			fmt.Scanln(&vrpin, &state)
			// virtual gpio の入力状態変更
			if !virtualgpio.VrgpioInputChange(
				vrpin,
				state,
				vrgpio,
			) {
				fmt.Println("change missed.")
				done <- false
			}
			done <- true
		}
	}
}