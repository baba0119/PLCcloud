package db

import "log"

func ProjectCountByUserid(userid string) (int, error) {
	var recordNum int
	recordCountStr := "SELECT count(*) FROM projects WHERE userid = ?"
	err := Db.QueryRow(recordCountStr, userid).Scan(&recordNum)
	if err != nil {
		log.Println(err)
		return 0, err
	}

	return recordNum, err
}