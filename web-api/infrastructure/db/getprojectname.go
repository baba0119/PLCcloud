package db

import "log"

func GetProjectName(projectid string) (string, error) {
	var projectname string
	selectStr := "SELECT projectname FROM projects WHERE projectid = ?"
	err := Db.QueryRow(selectStr, projectid).Scan(&projectname)
	if err != nil {
		log.Println(err)
		return "", err
	}

	return projectname, err
}