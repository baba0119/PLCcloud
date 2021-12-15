package controlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"plc-web-api/infrastructure/db"
	"plc-web-api/infrastructure/httpdatahandle"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func Login(w http.ResponseWriter, r *http.Request) {
	errResData := httpdatahandle.ErrorRes{
		Types: "missed",
	}
	errRes, err := json.Marshal(errResData)
	if err != nil {
		log.Fatal(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// プリフライトリクエストへ対応
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, errRes)
		return
	}

	if r.Header.Get("Content-Type") != "application/json" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, errRes)
		return
	}

	data, err := httpdatahandle.HttpJsonParse(r)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, errRes)

		log.Fatal(err)
		return
	}

	user := data.(httpdatahandle.User)

	// DBとの接続
	DB, err := db.DbConnect()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, errRes)

		log.Fatal(err)
		return
	}

	// useridからパスワードのハッシュを取り出す
	hash, err := db.GetPassHash(DB, user.Id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, errRes)

		log.Fatal(err)
		return
	}

	// パスワードがあっているか確認
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(user.Password))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, errRes)

		log.Fatal(err)
		return
	}

	// tokenの発行
	token, err := uuid.NewRandom()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, errRes)

		log.Fatal(err)
		return
	}

	// tokenをdbに保存
	err = db.UpdateToken(DB, user.Id, token.String())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, errRes)

		log.Fatal(err)
		return
	}

	// レスポンス
	resData := httpdatahandle.LoginRes{
		Token: token.String(),
	}
	res, err := json.Marshal(resData)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, errRes)

		log.Fatal(err)
		return
	}
	fmt.Fprintln(w, res)

}