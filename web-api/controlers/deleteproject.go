package controlers

import (
	"log"
	"plc-web-api/infrastructure/db"
)

func DeleteProject(usertoken, userid, projectid string) (bool, error) {
	token, err := db.GetUserToken(userid)
	if err != nil {
		log.Println(err)
		return false, err
	}

	if token != usertoken {
		return false, err
	}

	err = db.DeleteProject(projectid)
	if err != nil {
		log.Println(err)
		return false, err
	}

	return true, nil
}