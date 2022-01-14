package main

import (
	"fmt"
	"log"
	"time"

	"periph.io/x/conn/v3/gpio"
	"periph.io/x/conn/v3/gpio/gpioreg"
	"periph.io/x/host/v3"
)

func main() {
	go led()
	button()
}

func led() {
	// Load all the drivers:
	if _, err := host.Init(); err != nil {
		log.Fatal(err)
	}

	t := time.NewTicker(500 * time.Millisecond)
	for l := gpio.Low; ; l = !l {
		// Lookup a pin by its location on the board:
		if err := gpioreg.ByName("GPIO3").Out(l); err != nil {
			log.Fatal(err)
		}
		<-t.C
	}
}

func button() {
	// Load all the drivers:
	if _, err := host.Init(); err != nil {
		log.Fatal(err)
	}

	// Lookup a pin by its number:
	p := gpioreg.ByName("GPIO2")
	if p == nil {
		log.Fatal("Failed to find GPIO2")
	}

	fmt.Printf("%s: %s\n", p, p.Function())

	// Set it as input, with an internal pull down resistor:
	if err := p.In(gpio.PullUp, gpio.BothEdges); err != nil {
		log.Fatal(err)
	}

	// Wait for edges as detected by the hardware, and print the value read:
	for {
		time.Sleep(10 * time.Millisecond)
		fmt.Printf("-> %s\n", p.Read())
	}
}