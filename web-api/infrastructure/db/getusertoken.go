package db

import "log"

func GetUserToken(userid string) (string, error) {
	var token string
	err := Db.QueryRow("SELECT token FROM users WHERE userid = ?", userid).Scan(&token)
	if err != nil {
		log.Println(err)
		return "", err
	}

	return token, nil
}