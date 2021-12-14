package interfaces

import (
	"plc-web-api/controlers"
	"net/http"
)

func Handler() {
	http.HandleFunc("/debug", controlers.LdDebug)
	http.HandleFunc("/login", controlers.Login)
}