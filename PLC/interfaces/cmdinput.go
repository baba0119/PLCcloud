package interfaces

import (
	"PLC/statement"
	"fmt"
)

func CmdInput() {
	var buf string
	for {
		fmt.Scanln(&buf)

		if buf == "run" {
			statement.PLCmode = true
		} else if buf == "stop" {
			statement.PLCmode = false
		} else {
			fmt.Println("run もしくは stop を入力してください。")
			continue
		}
	}
}