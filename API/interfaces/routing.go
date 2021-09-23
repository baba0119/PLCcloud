package interfaces

import (
	"API/controlers"
	"net/http"
)

func Handler() {
	http.HandleFunc("/debug", controlers.LdDebug)
}