package db

import (
	"log"
	_ "github.com/go-sql-driver/mysql"
)

func GetPassHash(userid string) (string, error) {
	var hash string
	err := Db.QueryRow("SELECT passwords FROM users WHERE userid = ?", userid).Scan(&hash)
	if err != nil {
		log.Fatal(err)
		return "", err
	}

	return hash, nil
}