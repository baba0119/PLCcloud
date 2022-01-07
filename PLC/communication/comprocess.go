package communication

import (
	"PLC/statement"
	"encoding/json"
	"fmt"
	"log"
)

// 返り値は json文字列
func ComProcess(JSONstring string) (string, bool) {
	var operation OperationModel
	var resMessage string

	// json文字列のパース
	err := json.Unmarshal([]byte(JSONstring), &operation)
	if err != nil {
		log.Println("error: json.Unmashal() missed\n", err)
		return "", false
	}

	// operationKind の値で分岐
	switch operation.Kind {
	case "command":
		switch operation.Command {
		case "run":
			statement.PLCmode = true
		case "stop":
			statement.PLCmode = false
		default:
			return "", false
		}
		fallthrough

	case "check":
		if statement.PLCmode {
			if statement.LdJSON == "" {
				resMessage = "run. ラダープログラムが存在しません"
			} else {
				resMessage = "run."
			}
		} else {
			if statement.LdJSON == "" {
				resMessage = "stop. ラダープログラムが存在しません"
			} else {
				resMessage = "stop."
			}
		}

	default:
		log.Println("operation.Kind: miss match")
		return "", false
	}

	fmt.Printf("plc state: %v\n", statement.PLCmode)
	fmt.Printf("true => run\tfalse => stop\n")

	return resMessage, true
}