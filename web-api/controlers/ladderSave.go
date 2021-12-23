package controlers

import (
	"encoding/json"
	"fmt"
	"log"
	"plc-web-api/infrastructure/db"
	"plc-web-api/interfaces/httpdatahandle"
)

func LadderSave(saveReq httpdatahandle.LadderSaveReq) (bool, error) {
	token, err := db.GetUserToken(saveReq.UserId)
	if err != nil {
		log.Println(err)
		return false, err
	}

	if token != saveReq.Token {
		return false, err
	}

	ld, _ := json.Marshal(saveReq.LdJSON)
	fmt.Println(string(ld))

	err = db.LadderSave(saveReq.ProjectId, ld)
	if err != nil {
		log.Println(err)
		return false, err
	}

	return true, err
}