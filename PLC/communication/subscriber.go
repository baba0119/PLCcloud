package communication

import (
	"PLC/statement"
	"bytes"
	"flag"
	"fmt"
	"net"
	"os"
	"strings"

	proto "github.com/huin/mqtt"
	"github.com/jeffallen/mqtt"
)


func Subscriber() {
	var host = flag.String("host", "localhost:1883", "hostname of broker")
	var id = flag.String("id", "", "client id")
	var user = flag.String("user", "", "username")
	var pass = flag.String("pass", "", "password")
	var dump = flag.Bool("dump", false, "dump messages?")

	flag.Parse()

	if flag.NArg() < 1 {
		fmt.Fprintln(os.Stderr, "usage: sub topic [topic topic...]")
		return
	}

	conn, err := net.Dial("tcp", *host)
	if err != nil {
		fmt.Fprint(os.Stderr, "dial: ", err)
		return
	}
	cc := mqtt.NewClientConn(conn)
	cc.Dump = *dump
	cc.ClientId = *id

	tq := make([]proto.TopicQos, flag.NArg())
	for i := 0; i < flag.NArg(); i++ {
		tq[i].Topic = flag.Arg(i)
		statement.PLCid = flag.Arg(i)
		tq[i].Qos = proto.QosAtMostOnce
	}

	if err := cc.Connect(*user, *pass); err != nil {
		fmt.Fprintf(os.Stderr, "connect: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Connected with client id", cc.ClientId)
	cc.Subscribe(tq)

	for m := range cc.Incoming {
		r, w, _ := os.Pipe()
		fmt.Print("TopicName: ", m.TopicName, "\t")

		m.Payload.WritePayload(w) // 標準出力へ書き込み

		w.Close() // 閉じないと永遠に書き込みが終わらない
		var buf bytes.Buffer
		buf.ReadFrom(r) // バッファーに値をコピー
		r.Close()

		s := strings.TrimRight(buf.String(), "\n")  // バッファーから文字列へ変換
		fmt.Fprintf(os.Stdout, "%s", s) // この時 s は JSON文字列 であること
		fmt.Printf("\tr: %v\n", m.Header.Retain)

		resMessage, result := ComProcess(s)
		fmt.Printf("response Message: %s\n", resMessage)
		fmt.Printf("result: %v\n", result)
		// Publisher(resMessage, result)
	}
}