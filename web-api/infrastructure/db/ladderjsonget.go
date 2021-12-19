package db

import "log"

func GetLadderJSON(projectid string) (interface{}, error) {
	selectStr := "SELECT ldproglam FROM projects WHERE projectid = ?"
	var ladderJson interface{}
	err := Db.QueryRow(selectStr, projectid).Scan(&ladderJson)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return ladderJson, err
}