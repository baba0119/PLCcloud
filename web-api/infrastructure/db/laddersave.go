package db

import "log"

func LadderSave(projectid string, LdJSON interface{}) error {
	updateStr := "UPDATE projects SET ldprogram = ? WHERE projectid = ?"
	stmtUpdate, err := Db.Prepare(updateStr)
	if err != nil {
		log.Println(err)
		return err
	}

	_, err = stmtUpdate.Exec(LdJSON, projectid)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}