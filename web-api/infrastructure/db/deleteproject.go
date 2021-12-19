package db

import "log"

func DeleteProject(projectid string) (error) {
	deleteStr := "DELETE FROM projects WHERE projectid = ?"
	stmtDelete, err := Db.Prepare(deleteStr)
	if err != nil {
		log.Println(err)
		return err
	}

	_, err = stmtDelete.Exec(projectid)
	if err != nil {
		log.Println(err)
		return err
	}

	return err
}