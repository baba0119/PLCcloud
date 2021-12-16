package controlers

import (
	"log"
	"plc-web-api/infrastructure/db"
	"plc-web-api/interfaces/httpdatahandle"
)

func ProjectInsert(project httpdatahandle.Project) (bool, error) {
	// ログイン状態かどうか確かめる
	token, err := db.GetUserToken(project.UserId)
	if err != nil {
		log.Println(err)
		return false, err
	}

	if project.Token != token {
		return false, nil
	}

	// プロジェクトの新規保存
	isSuccess, err := db.NewProjectCreate(project.UserId, project.Name)
	if err != nil {
		log.Println(err)
		return false, err
	}

	if !isSuccess {
		return false, nil
	}

	return true, nil
}