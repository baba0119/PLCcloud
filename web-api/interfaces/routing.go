package interfaces

import (
	"net/http"
	"plc-web-api/controlers"
	"plc-web-api/interfaces/manufacturing"
)

func Handler() {
	http.HandleFunc("/debug", controlers.LdDebug)
	http.HandleFunc("/login", manufacturing.Login)
	http.HandleFunc("/project", manufacturing.Project)
}