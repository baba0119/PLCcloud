package gpiooperation

import (
	"PLC/plcengine/datamodel/vrgpiomodel"
	"fmt"
	"log"
	"strings"

	"periph.io/x/conn/v3/gpio"
	"periph.io/x/conn/v3/gpio/gpioreg"
)

func Control(vrgpio map[string]*vrgpiomodel.VRgpio) bool {
	for name, pin := range vrgpio {
		if pin.GpioMode == "input" {
			continue
		}

		name = strings.ToUpper(name)
		var l gpio.Level
		if pin.GpioState {
			l = gpio.High
			fmt.Printf("%s -> %s\n", name, l)
		} else {
			l = gpio.Low
			fmt.Printf("%s -> %s\n", name, l)
		}

		if err := gpioreg.ByName(name).Out(l); err != nil {
			log.Println(err)
			return false
		}
	}

	return true
}