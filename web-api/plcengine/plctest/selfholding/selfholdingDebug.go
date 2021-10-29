package selfholding

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"plc-web-api/plcengine/processing/ladderdebug"
)

// jsonからラダープログラムの解析
func SelfholdingDebug() {
	// ------------------------------------------
	// ラダープログラムjson取得
	// ------------------------------------------
	/* --
		とりあえず SelfholdingMapping()
		と同じものを吐くかどうかでチェック
	-- */
	ladder, err := os.ReadFile("./plcengine/plctest/plcData/selfholding.json")
	if err != nil {
		log.Fatal(err)
		return
	}

	var jsonData interface{}
	err = json.Unmarshal(ladder, &jsonData)
	if err != nil {
		log.Fatal(err)
		return
	}

	// ノードの存在位置の確認
	nodeExist, err := ladderdebug.NodeCheckExistence(jsonData)
	if err != nil {
		log.Fatal(err)
		return
	}

	IOpointSlice, err := ladderdebug.LdContactCheck(jsonData, nodeExist)
	if err != nil {
		log.Fatal(err)
		return
	}
	for i, p := range IOpointSlice {
		fmt.Println(i, p)
	}
}