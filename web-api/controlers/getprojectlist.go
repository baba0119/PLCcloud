package controlers

import (
	"log"
	"plc-web-api/infrastructure/db"
	"plc-web-api/interfaces/httpdatahandle"
)

func GetProjectList(userid string) ([]httpdatahandle.ProjectRes, error) {
	recordNum, err := db.ProjectCountByUserid(userid)
	if err != nil {
		log.Println(err)
		return []httpdatahandle.ProjectRes{}, err
	}

	projectList, err := db.GetProjectList(userid, recordNum)
	if err != nil {
		log.Println(err)
		return []httpdatahandle.ProjectRes{}, err
	}

	return projectList, err
}