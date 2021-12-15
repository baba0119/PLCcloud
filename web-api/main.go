package main

import (
	"log"
	"net/http"
	"plc-web-api/infrastructure/db"
	"plc-web-api/interfaces"
	// "plc-web-api/utils"
)

func main() {
	// utils.UserRegister()
	// DBとの接続
	err := db.DbConnect()
	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Db.Close()

	interfaces.Handler()
	http.ListenAndServe(":8080", nil)
}