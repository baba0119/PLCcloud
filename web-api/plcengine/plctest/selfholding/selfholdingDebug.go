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

	data, err := ladderdebug.NodeCheckExistence(jsonData)
	if err != nil {
		log.Fatal(err)
		return
	}
	for i, p := range data {
		fmt.Println(i, p)
	}
}