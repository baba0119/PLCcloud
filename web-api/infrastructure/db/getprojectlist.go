package db

import (
	"log"
	"plc-web-api/interfaces/httpdatahandle"
)

func GetProjectList(userid string, recordNum int) ([]httpdatahandle.ProjectRes, error) {
	selectStr := "SELECT projectid, projectname FROM projects WHERE userid = ?"
	rows, err := Db.Query(selectStr, userid)
	if err != nil {
		log.Println(err)
		return []httpdatahandle.ProjectRes{}, err
	}
	defer rows.Close()

	ProjectList := make([]httpdatahandle.ProjectRes, recordNum)
	for i := 0; rows.Next(); i++ {
		err := rows.Scan(
			&ProjectList[i].Id,
			&ProjectList[i].Name,
		)
		if err != nil {
			log.Println(err)
			return []httpdatahandle.ProjectRes{}, err
		}
	}

	return ProjectList, err
}