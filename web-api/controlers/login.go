package controlers

import (
	"log"
	"plc-web-api/infrastructure/db"
	"plc-web-api/interfaces/httpdatahandle"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func Login(user httpdatahandle.User) (httpdatahandle.LoginRes, error) {
	loginRes := httpdatahandle.LoginRes{
		Token: "",
		Id:    "",
	}
	// useridからパスワードのハッシュを取り出す
	hash, err := db.GetPassHash(user.Id)
	if err != nil {
		log.Println(err)
		return loginRes, err
	}

	// パスワードがあっているか確認
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(user.Password))
	if err != nil {
		log.Println(err)
		return loginRes, err
	}

	// tokenの発行
	token, err := uuid.NewRandom()
	if err != nil {
		log.Println(err)
		return loginRes, err
	}

	// tokenをdbに保存
	err = db.UpdateToken(user.Id, token.String())
	if err != nil {
		log.Println(err)
		return loginRes, err
	}

	loginRes.Id = user.Id
	loginRes.Token = token.String()
	return loginRes, nil
}