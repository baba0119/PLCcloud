package main

import (
	"PLC/communication"
	"PLC/statement"
)

// "PLC/plcengine/plctest/selfholding"

func main() {
	isEnd := make(chan bool)
	subup := make(chan bool)

	// mqtt コミュニ―ケーション goroutin
	// 命令受け取り Subscriber
	go communication.Subscriber(isEnd, subup)
	isSubup1 := <- subup
	if !isSubup1 {
		return
	}

	// ラダープログラム受け取り Subscriber
	// communication.SendSubscriber()

	// plc 動作管理 goroutin
	statement.PLCManagement()

	// エラーが発生したときに出る

	// selfholding.SelfholdingRun()
}