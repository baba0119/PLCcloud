package main

import (
	// "PLC/communication"
	"PLC/interfaces"
	"PLC/statement"
	"log"

	"periph.io/x/host/v3"
)

// "PLC/plcengine/plctest/selfholding"

func main() {
	// 全てのドライバを読み込み
	if _, err := host.Init(); err != nil {
		log.Fatal(err)
	}

	// 標準入力で PLC の操作
	go interfaces.CmdInput()

	// plc 動作管理 goroutin
	statement.PLCManagement()
}