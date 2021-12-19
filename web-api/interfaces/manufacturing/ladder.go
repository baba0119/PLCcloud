package manufacturing

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"plc-web-api/controlers"
	"plc-web-api/interfaces/httpdatahandle"
)

func Ladder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", LOCAL_END_POINT)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")

	// プリフライトリクエストへ対応
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", LOCAL_END_POINT)
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {
	case "POST":
		if r.Header.Get("Content-Type") != "application/json" {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// リクエストボディからデータの取り出し
		body, err := httpdatahandle.DataRetrieval(r)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		var ladder httpdatahandle.ProjectReqFlame
		err = json.Unmarshal(body, &ladder)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		ladderJson, isSuccess, err := controlers.GetLadderProgram(ladder)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		if isSuccess {
			w.WriteHeader(http.StatusOK)
			fmt.Fprintln(w, ladderJson)
		} else {
			w.WriteHeader(http.StatusOK)
			fmt.Fprintln(w, "missed")
		}
	}
}