package plctest

import (
	"PLC/plcengine/processing/gpiooperation/virtualgpio"
	"fmt"
)

func GpioOperationTest() {
	// ------------------------------------------
	// 仮想gpio関連
	// ------------------------------------------
	// 仮想gpioマッピング
	vrgpio := virtualgpio.VirtualGpioMapping()

	// gpio設定変更確認
	fmt.Println("virtual gpio 初期状態")
	virtualgpio.ShowVirtualGpio(vrgpio)
	fmt.Println()

	var done, delay chan bool
	go VrgpioStdinControler(done, delay, vrgpio)
	GpioInputDiffDetection(vrgpio)
}