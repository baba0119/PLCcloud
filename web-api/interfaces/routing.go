package interfaces

import (
	"net/http"
	"plc-web-api/controlers"
	"plc-web-api/interfaces/methodbifu"
)

func Handler() {
	http.HandleFunc("/debug", controlers.LdDebug)
	http.HandleFunc("/login", controlers.Login)
	http.HandleFunc("/project", methodbifu.Ladder)
}