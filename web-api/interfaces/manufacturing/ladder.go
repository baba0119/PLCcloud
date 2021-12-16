package manufacturing

import (
	"net/http"
	"plc-web-api/controlers"
)

func Ladder(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		controlers.ProjectInsert(w, r)
	}
}