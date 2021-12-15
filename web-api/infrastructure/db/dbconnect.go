package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB

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
		log.Fatal("sql.Open():", err)
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("db.Ping():", err)
		return nil, err
	}

	Db = db

	return db, nil
}