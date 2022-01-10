package controlers

import (
	"fmt"
	"log"
	"plc-web-api/infrastructure/db"
	"plc-web-api/infrastructure/plcconn"
)

func LdJSONSend(ldJSON []byte, projectid string) error {
	// プロジェクトidから識別idを取り出す
	plcid, err := db.GetPLCId(projectid)
	if err != nil {
		log.Println(err)
		return err
	}

	// ラダープログラムの送信
	fmt.Printf("plcid:\t%s\n", plcid + "send")

	err = plcconn.LdJSONPub(ldJSON, plcid)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}