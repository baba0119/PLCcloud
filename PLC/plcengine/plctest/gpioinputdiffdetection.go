package plctest

import (
	"PLC/plcengine/datamodel/vrgpiomodel"
	"fmt"
	"log"
	"time"

	"periph.io/x/conn/v3/gpio"
	"periph.io/x/conn/v3/gpio/gpioreg"
	"periph.io/x/host/v3"
)

func GpioInputDiffDetection(vrgpio map[string]*vrgpiomodel.VRgpio) {
	// Load all the drivers:
	if _, err := host.Init(); err != nil {
		log.Fatal(err)
	}

	for {
		if IsStdin {
			continue
		}
		// gpio の pin への参照を配列にマップ
		ioLen := make(map[string]gpio.PinIO)
		for pin, info := range vrgpio {
			if info.GpioMode != "input" {
				continue
			}

			p := gpioreg.ByName(pin)
			if p == nil {
					log.Fatal("Failed to find " + pin)
			}

			// Set it as input, with an internal pull down resistor:
			if err := p.In(gpio.PullUp, gpio.BothEdges); err != nil {
					log.Fatal(err)
			}

			ioLen[pin] = p
		}

		// gpio の状態を取得する
		// 差分を検出したらvrgpioに処理を反映
		for !IsStdin {
			for name, pin := range ioLen {
				if !IsStdin {
					time.Sleep(10 * time.Millisecond)
					fmt.Printf("%s -> %s\n", name ,pin.Read())
				}
			}
		}
	}
}