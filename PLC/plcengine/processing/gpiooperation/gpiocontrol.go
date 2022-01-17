package gpiooperation

import (
	"PLC/plcengine/datamodel/vrgpiomodel"
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
		} else {
			l = gpio.Low
		}

		if err := gpioreg.ByName(name).Out(l); err != nil {
			log.Println(err)
			return false
		}
	}

	return true
}