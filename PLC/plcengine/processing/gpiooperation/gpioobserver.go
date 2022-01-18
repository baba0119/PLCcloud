package gpiooperation

import (
	"PLC/plcengine/datamodel/vrgpiomodel"
	"strings"
	// "fmt"
	"log"
	"time"

	"periph.io/x/conn/v3/gpio"
	"periph.io/x/conn/v3/gpio/gpioreg"
)

func Observer(
	done chan bool,
	delay chan bool,
	vrgpio map[string]*vrgpiomodel.VRgpio,
) {
	for {
		// gpio の pin への参照を配列にマップ
		ioLen := make(map[string]gpio.PinIO)
		for pin, info := range vrgpio {
			if info.GpioMode != "input" {
				continue
			}

			name := strings.ToUpper(pin)
			p := gpioreg.ByName(name)
			if p == nil {
					log.Fatal("Failed to find " + name)
			}

			// Set it as input, with an internal pull down resistor:
			if err := p.In(gpio.PullDown, gpio.BothEdges); err != nil {
					log.Fatal(err)
			}

			ioLen[pin] = p
		}

		// gpio の状態を取得する
		// 差分を検出したらvrgpioに処理を反映
		for {
			for name, pin := range ioLen {
				time.Sleep(10 * time.Millisecond)
				// fmt.Printf("%s -> %s\n", name ,pin.Read())
				pinState := pin.Read().String()

				// ボタン押してるとき   :Low
				// ボタン押してないとき :High
				switch {
				case vrgpio[name].GpioState && pinState == "High":
					// fmt.Printf("%s: %s\n", name, pinState)
					vrgpio[name].GpioState = false
					done <- true
					<- delay
				case !vrgpio[name].GpioState && pinState == "Low":
					// fmt.Printf("%s: %s\n", name, pinState)
					vrgpio[name].GpioState = true
					done <- true
					<- delay
				}
			}
		}
	}
}