package manufacturing

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"plc-web-api/controlers"
	"plc-web-api/interfaces/httpdatahandle"
)

func Project(w http.ResponseWriter, r *http.Request) {
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

		var project httpdatahandle.Project
		err = json.Unmarshal(body, &project)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		// コントローラーの使用
		isSuccess, err := controlers.ProjectInsert(project)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		if !isSuccess {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// レスポンス
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "ok!!!")

	case "GET":
		// データ取り出し
		userid := r.FormValue("userid")

		projectList, err := controlers.GetProjectList(userid)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		res, err := json.Marshal(projectList)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}
		fmt.Println("project list: ", string(res))
		fmt.Fprintln(w, string(res))

	case "DELETE":
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

		var deleteProject httpdatahandle.DeleteProjectReqFlame
		err = json.Unmarshal(body, &deleteProject)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		isSuccess, err := controlers.DeleteProject(
			deleteProject.Token,
			deleteProject.UserId,
			deleteProject.ProjectId,
		)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)

			log.Println(err)
			return
		}

		if isSuccess {
			w.WriteHeader(http.StatusOK)
			fmt.Fprintln(w, "ok")
		} else {
			w.WriteHeader(http.StatusOK)
			fmt.Fprintln(w, "missed")
		}
	}
}