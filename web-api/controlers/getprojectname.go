package controlers

import (
	"log"
	"plc-web-api/infrastructure/db"
)

func GetProjectName(projectid string) (string, error) {
	projectname, err := db.GetProjectName(projectid)
	if err != nil {
		log.Println(err)
		return "", err
	}

	return projectname, nil
}