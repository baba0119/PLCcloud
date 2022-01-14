package plctest

import (
	"PLC/plcengine/datamodel/vrgpiomodel"
	"PLC/plcengine/processing/gpiooperation/virtualgpio"
	"fmt"
)

func VrgpioStdinControler(
	done chan bool,
	delay chan bool,
	vrgpio map[string]*vrgpiomodel.VRgpio,
) {
	for {
		var kinds, pin, content string

		fmt.Print("コマンドの入力＞")
		fmt.Scanln(&kinds, &pin, &content)

		IsStdin = true

		switch kinds {
		case "done":
			var op bool
			if content == "high" {
				op = true
			} else if content == "low" {
				op = false
			} else {
				fmt.Println("high もしくは low を入力してください")
				IsStdin = false
				continue
			}
			virtualgpio.VrgpioOutputChange(pin, op, vrgpio)
			done <- true // 出力動作開始
			<- delay     // 出力動作終了伝達
		case "mode":
			virtualgpio.VrgpioModeChange(pin, content, vrgpio)
		case "show":
			virtualgpio.ShowVirtualGpio(vrgpio)
		default:
			fmt.Println("第一コマンドを間違えています")
		}

		IsStdin = false
	}
}