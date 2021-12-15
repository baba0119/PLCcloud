package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func DbConnect() (*sql.DB, error) {
	DBinfo := DBinfo()
	dbOpenStr := fmt.Sprintf(
		"%s:%s@tcp(%s)/%s",
		DBinfo.DBuser,
		DBinfo.DBpass,
		DBinfo.DBhost,
		DBinfo.DBname,
	)

	db, err := sql.Open("mysql", dbOpenStr)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return db, nil
}