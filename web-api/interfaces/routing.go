package interfaces

import (
	"net/http"
	"plc-web-api/interfaces/manufacturing"
)

func Handler() {
	http.HandleFunc("/debug", manufacturing.Debug)
	http.HandleFunc("/login", manufacturing.Login)
	http.HandleFunc("/project", manufacturing.Project)
	http.HandleFunc("/ladder", manufacturing.Ladder)
	http.HandleFunc("/plcid", manufacturing.PLCId)
	http.HandleFunc("/ld-send", manufacturing.LdSend)
}