package main

import "PLC/communication"

// "PLC/plcengine/plctest/selfholding"

func main() {
	// mqtt コミュニ―ケーション goroutin
	communication.Subscriber()

	// plc 動作管理 goroutin

	// エラーが発生したときに出る

	// selfholding.SelfholdingRun()
}