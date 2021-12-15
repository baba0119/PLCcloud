package main

import (
	"net/http"
	"plc-web-api/interfaces"
	// "plc-web-api/utils"
)

func main() {
	// utils.UserRegister()

	interfaces.Handler()
	http.ListenAndServe(":8080", nil)
}