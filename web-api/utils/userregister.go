package utils

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"plc-web-api/db"

	"golang.org/x/crypto/bcrypt"
	_ "github.com/go-sql-driver/mysql"
)

func UserRegister() {
	flag.Parse()

	if flag.NArg() != 2 {
		fmt.Println("cmd line: [userid] [password]")
		return
	}

	user := make([]string, flag.NArg())
	for i := 0; i < flag.NArg(); i++ {
		user[i] = flag.Arg(i)
	}

	// fmt.Println(user[0], user[1])
	password := []byte(user[1])
	hashed, _ := bcrypt.GenerateFromPassword(password, 10)
	// fmt.Println(string(hashed))

	err := bcrypt.CompareHashAndPassword(hashed, password)
	if err != nil {
		log.Fatal(err)
		return
	}

	DBinfo := db.DBinfo()
	dbOpenStr := fmt.Sprintf(
		"%s:%s@tcp(%s)/%s",
		DBinfo.DBuser,
		DBinfo.DBpass,
		DBinfo.DBhost,
		DBinfo.DBname,
	)

	db, err := sql.Open("mysql", dbOpenStr)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
		return
	}

	stmtInsert, err := db.Prepare("INSERT INTO users(userid, passwords) VALUES(?, ?)")
	if err != nil {
		log.Fatal("1", err)
		return
	}
	defer stmtInsert.Close()

	_, err = stmtInsert.Exec(user[0], string(hashed))
	if err != nil {
		log.Fatal("2", err)
		return
	}
}