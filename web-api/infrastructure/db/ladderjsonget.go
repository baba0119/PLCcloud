package db

import "log"

func GetLadderJSON(projectid string) (interface{}, error) {
	selectStr := "SELECT ldprogram FROM projects WHERE projectid = ?"
	var ladderJson interface{}
	err := Db.QueryRow(selectStr, projectid).Scan(&ladderJson)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	if ladderJson == nil {
		ladderJson = ""
	}

	return ladderJson, err
}