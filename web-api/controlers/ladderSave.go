package controlers

import (
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

	err = db.LadderSave(saveReq.ProjectId, saveReq.LdJSON)
	if err != nil {
		log.Println(err)
		return false, err
	}

	return true, err
}