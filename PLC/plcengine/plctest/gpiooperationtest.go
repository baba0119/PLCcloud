package plctest

import (
	"PLC/plcengine/processing/gpiooperation/virtualgpio"
	"fmt"
	"log"

	"periph.io/x/host/v3"
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

	// 全てのドライバを読み込み
	if _, err := host.Init(); err != nil {
		log.Fatal(err)
	}

	var done, delay chan bool
	go VrgpioStdinControler(done, delay, vrgpio)
	GpioInputDiffDetection(vrgpio)
}