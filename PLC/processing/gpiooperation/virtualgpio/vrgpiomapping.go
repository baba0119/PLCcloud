package virtualgpio

import (
	"PLC/datamodel/vrgpiomodel"
	"strconv"
)

// vrtual gpio のマッピング
func VirtualGpioMapping() map[string]*vrgpiomodel.VRgpio {
	vrgpio := make(map[string]*vrgpiomodel.VRgpio)
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		vrgpio[str] = &vrgpiomodel.VRgpio{
			GpioMode:"output",
			GpioState: false,
		}
	}

	return vrgpio
}