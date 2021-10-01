package vrgpiomodel

// 仮想gpioの構造体
// GpioModeの中には
// output か input という文字列が入る
type VRgpio struct {
	GpioMode	string
	GpioState	bool
}