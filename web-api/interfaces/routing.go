package interfaces

import (
	"lolipop-api/controlers"
	"net/http"
)

func Handler() {
	http.HandleFunc("/debug", controlers.LdDebug)
}