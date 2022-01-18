package main

import (
	// "PLC/communication"
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

	// isEnd := make(chan bool)
	// subup := make(chan bool)

	// mqtt コミュニ―ケーション goroutin
	// 命令受け取り Subscriber
	// go communication.Subscriber(isEnd, subup)
	// isSubup1 := <- subup
	// if !isSubup1 {
	// 	return
	// }

	// ラダープログラム受け取り Subscriber
	// communication.SendSubscriber()

	// plc 動作管理 goroutin
	statement.PLCManagement()
}