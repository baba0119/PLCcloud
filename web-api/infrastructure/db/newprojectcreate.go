package db

import (
	"log"

	"github.com/google/uuid"
)

func NewProjectCreate(userid, projectName string) (bool, error) {
	u, err := uuid.NewRandom()
	if err != nil {
		log.Println(err)
		return false, err
	}
	projectid := u.String()

	u, err = uuid.NewRandom()
	if err != nil {
		log.Println(err)
		return false, err
	}
	plcid := u.String()

	stmtInsert, err := Db.Prepare("INSERT INTO projects(userid, projectid, projectname, plcid) VALUES(?, ?, ?, ?)")
	if err != nil {
		log.Println(err)
		return false, err
	}
	defer stmtInsert.Close()

	_, err = stmtInsert.Exec(userid, projectid, projectName, plcid)
	if err != nil {
		log.Println(err)
		return false, err
	}

	return true, nil
}