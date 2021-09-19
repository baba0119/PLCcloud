package virtualgpio

import (
	"PLC/datamodel/vrgpiomodel"
	"fmt"
	"strconv"
)

// vrtual gpio のマッピング
func VirtualGpioMapping() map[string]vrgpiomodel.VRgpio {
	vrgpio := make(map[string]vrgpiomodel.VRgpio)
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		vrgpio[str] = vrgpiomodel.VRgpio{
			GpioMode:"output",
			GpioState: false,
		}
	}

	return vrgpio
}

// virtual gpio の中身を表示する
// 最初はrangeでやったがうまくいかなかった
// rangeは乱択であり、かつ表示できる要素数に制限があるのかも
func ShowVirtualGpio(vrgpio map[string]vrgpiomodel.VRgpio) {
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		fmt.Printf("%v {mode:%v, state:%v}\n",
			str, vrgpio[str].GpioMode, vrgpio[str].GpioState)
	}
}

// 動作チェック用関数
func CheckVirtualGpio() {
	vrgpio := VirtualGpioMapping()
	ShowVirtualGpio(vrgpio)
}