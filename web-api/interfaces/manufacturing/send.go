package manufacturing

import (
	"fmt"
	"log"
	"net/http"
	"plc-web-api/controlers"
	"plc-web-api/interfaces/httpdatahandle"
)

func LdSend(w http.ResponseWriter, r *http.Request) {
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

	if r.Header.Get("Content-Type") != "application/json" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// データ取り出し
	projectid := r.FormValue("projectid")

	// リクエストボディからデータの取り出し
	body, err := httpdatahandle.DataRetrieval(r)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)

		log.Println(err)
		return
	}

	err = controlers.LdJSONSend(body, projectid)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "ok")
}