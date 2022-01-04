package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net"
	"os"

	proto "github.com/huin/mqtt"
	"github.com/jeffallen/mqtt"
)

var host = flag.String("host", "localhost:1883", "hostname of broker")
var user = flag.String("user", "", "username")
var pass = flag.String("pass", "", "password")
var dump = flag.Bool("dump", false, "dump messages?")
var retain = flag.Bool("retain", false, "retain message?")
var wait = flag.Bool("wait", false, "stay connected after publishing?")

type OperationModel struct {
	Kind    string `json:"kind"`
	Command string `json:"command"`
}

// 第一引数：key
// 第二引数：operation.Kind
// 第三引数：operation.command
func main() {
	var operation OperationModel

	flag.Parse()

	if flag.NArg() != 3 {
		fmt.Fprintln(os.Stderr, "usage: pub topic message")
		return
	}

	conn, err := net.Dial("tcp", *host)
	if err != nil {
		fmt.Fprint(os.Stderr, "dial: ", err)
		return
	}
	cc := mqtt.NewClientConn(conn)
	cc.Dump = *dump

	if err := cc.Connect(*user, *pass); err != nil {
		fmt.Fprintf(os.Stderr, "connect: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Connected with client id", cc.ClientId)

	operation.Kind = flag.Arg(1)
	operation.Command = flag.Arg(2)
	e, err := json.Marshal(operation)
	if err != nil {
		log.Println("json.Marshal():", err)
		return
	}
	fmt.Printf("json文字列 : %s\n", string(e))

	cc.Publish(&proto.Publish{
		Header:    proto.Header{Retain: *retain},
		TopicName: flag.Arg(0),
		Payload:   proto.BytesPayload(e),
	})

	if *wait {
		<-make(chan bool)
	}

	cc.Disconnect()
}