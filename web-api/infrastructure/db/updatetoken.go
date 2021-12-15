package db

import (
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func UpdateToken(userid, token string) error {
	stmtUpdate, err := Db.Prepare("UPDATE users SET token=? WHERE userid=?")
	if err != nil {
		log.Fatal(err)
		return err
	}
	defer stmtUpdate.Close()

	_, err = stmtUpdate.Exec(token, userid)
	if err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}