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


func SendSubscriber() {
	var sendhost = flag.String("sendhost", "localhost:1883", "hostname of broker")
	var sendid = flag.String("sendid", "", "client id")
	var senduser = flag.String("senduser", "", "username")
	var sendpass = flag.String("sendpass", "", "password")
	var senddump = flag.Bool("senddump", false, "dump messages?")

	flag.Parse()

	if flag.NArg() < 1 {
		fmt.Fprintln(os.Stderr, "usage: sub topic [topic topic...]")
		return
	}

	conn, err := net.Dial("tcp", *sendhost)
	if err != nil {
		fmt.Fprint(os.Stderr, "dial: ", err)
		return
	}
	cc := mqtt.NewClientConn(conn)
	cc.Dump = *senddump
	cc.ClientId = *sendid

	tq := make([]proto.TopicQos, flag.NArg())
	for i := 0; i < flag.NArg(); i++ {
		tq[i].Topic = flag.Arg(i) + "send"
		statement.PLCid = flag.Arg(i)
		tq[i].Qos = proto.QosAtMostOnce
	}

	if err := cc.Connect(*senduser, *sendpass); err != nil {
		fmt.Fprintf(os.Stderr, "connect: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Connected with client id", cc.ClientId)
	cc.Subscribe(tq)

	fmt.Println("--- plc info ---")
	fmt.Println("ラダープログラム受け取り Subscriber")
	fmt.Printf("plc-id : %s\n", statement.PLCid + "send")
	fmt.Printf("---------------\n\n")

	for m := range cc.Incoming {
		fmt.Println(":ラダープログラム受け取り")

		r, w, _ := os.Pipe()
		fmt.Print("TopicName: ", m.TopicName, "\t")

		m.Payload.WritePayload(w) // パイプへ書き込み

		w.Close() // 閉じないと永遠に書き込みが終わらない
		var buf bytes.Buffer
		buf.ReadFrom(r) // バッファーに値をコピー
		r.Close()

		s := strings.TrimRight(buf.String(), "\n")  // バッファーから文字列へ変換
		if s == "" {
			continue
		}
		fmt.Print("json文字列受信\t")
		fmt.Printf("\tr: %v\n", m.Header.Retain)

		fmt.Printf("json文字列:\n%s\n", s)
	}
}