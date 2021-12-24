package db

import "log"

func GetLadderJSON(projectid string) ([]byte, error) {
	selectStr := "SELECT ldprogram FROM projects WHERE projectid = ?"
	var ladderJson []byte
	err := Db.QueryRow(selectStr, projectid).Scan(&ladderJson)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return ladderJson, err
}