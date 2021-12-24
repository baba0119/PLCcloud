package controlers

import (
	"fmt"
	"log"
	"plc-web-api/infrastructure/db"
	"plc-web-api/interfaces/httpdatahandle"
)

func GetLadderProgram(
	project httpdatahandle.ProjectReqFlame) (
		[]byte, bool, error,
) {
	token, err := db.GetUserToken(project.UserId)
	if err != nil {
		log.Println(err)
		return nil, false, err
	}

	if token != project.Token {
		return nil, false, err
	}

	ladderJson, err := db.GetLadderJSON(project.ProjectId)
	if err != nil {
		log.Println(err)
		return nil, false, err
	}

	fmt.Println(string(ladderJson))

	return ladderJson, true, err
}