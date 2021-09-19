package virtualgpio

import (
	"PLC/datamodel/vrgpiomodel"
	"fmt"
	"strconv"
)

// virtual gpio の中身を表示する
// 最初はrangeでやったがうまくいかなかった
// rangeは乱択であり、かつ表示できる要素数に制限があるのかも
func ShowVirtualGpio(vrgpio map[string]*vrgpiomodel.VRgpio) {
	for i := 0 ; i < 34 ; i++ {
		str := "Gpio" + strconv.Itoa(i)
		fmt.Printf("%v\t{mode:%v,\tstate:%v}\n",
			str, vrgpio[str].GpioMode, vrgpio[str].GpioState)
	}
}

// 動作チェック用関数
func CheckVirtualGpio() {

	// gpioが適切にマッピングできてるかチェック
	fmt.Println("マッピング確認")
	vrgpio := VirtualGpioMapping()
	ShowVirtualGpio(vrgpio)
	fmt.Println()

	// virtual gpio の mode を変更
	fmt.Println("モード変更確認")
	VrgpioModeChange("Gpio3", "input", vrgpio)
	ShowVirtualGpio(vrgpio)
	fmt.Println()

	// virtual gpio の output を変更
	fmt.Println("アウトプット変更確認")
	VrgpioOutputChange("Gpio3", true, vrgpio)
	ShowVirtualGpio(vrgpio)
	fmt.Println()
}