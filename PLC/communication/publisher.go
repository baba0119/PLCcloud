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

func Publisher(resMessage string, result bool) {
	var host = flag.String("host", "localhost:1883", "hostname of broker")
	var user = flag.String("user", "", "username")
	var pass = flag.String("pass", "", "password")
	var dump = flag.Bool("dump", false, "dump messages?")
	var retain = flag.Bool("retain", false, "retain message?")
	var wait = flag.Bool("wait", false, "stay connected after publishing?")

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

	cc.Publish(&proto.Publish{
		Header:    proto.Header{Retain: *retain},
		TopicName: statement.PLCid + "pub",
		Payload:   proto.BytesPayload([]byte(resMessage)),
	})

	if *wait {
		<-make(chan bool)
	}

	cc.Disconnect()
}