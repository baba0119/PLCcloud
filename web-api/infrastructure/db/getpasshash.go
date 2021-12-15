package db

import (
	"database/sql"
	"log"
	_ "github.com/go-sql-driver/mysql"
)

func GetPassHash(db *sql.DB, userid string) (string, error) {
	var hash string
	err := db.QueryRow("SELECT pass FROM users WHERE id = ?", userid).Scan(&hash)
	if err != nil {
		log.Fatal(err)
		return "", err
	}

	return hash, nil
}