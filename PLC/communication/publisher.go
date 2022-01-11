package communication

import (
	"PLC/statement"
	"flag"
	"fmt"
	"net"
	"os"

	proto "github.com/huin/mqtt"
	"github.com/jeffallen/mqtt"
)

var pubhost = flag.String("pubhost", "localhost:1883", "hostname of broker")
var pubuser = flag.String("pubuser", "", "username")
var pubpass = flag.String("pubpass", "", "password")
var pubdump = flag.Bool("pubdump", false, "dump messages?")
var pubretain = flag.Bool("pubretain", false, "retain message?")
var wait = flag.Bool("wait", false, "stay connected after publishing?")

func Publisher(resMessage string, result bool) {
	conn, err := net.Dial("tcp", *pubhost)
	if err != nil {
		fmt.Fprint(os.Stderr, "dial: ", err)
		return
	}
	cc := mqtt.NewClientConn(conn)
	cc.Dump = *pubdump

	if err := cc.Connect(*pubuser, *pubpass); err != nil {
		fmt.Fprintf(os.Stderr, "connect: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Connected with client id", cc.ClientId)

	cc.Publish(&proto.Publish{
		Header:    proto.Header{Retain: *pubretain},
		TopicName: statement.PLCid + "sub",
		Payload:   proto.BytesPayload([]byte(resMessage)),
	})

	if *wait {
		<-make(chan bool)
	}

	cc.Disconnect()
}