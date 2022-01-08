package controlers

import (
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
	err = plcconn.LdJSONPub(ldJSON, plcid)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}