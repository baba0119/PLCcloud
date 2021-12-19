package db

import "log"

func DeleteProject(projectid string) (bool, error) {
	deleteStr := "DELETE FROM projects WHERE projectid = ?"
	stmtDelete, err := Db.Prepare(deleteStr)
	if err != nil {
		log.Println(err)
		return false, err
	}

	_, err = stmtDelete.Exec(projectid)
	if err != nil {
		log.Println(err)
		return false, err
	}

	return true, err
}