package virtualgpio

import (
	"lolipop-api/plcengine/datamodel/ldexemodel"
	"lolipop-api/plcengine/datamodel/vrgpiomodel"
)

// ===========================================================
// gpio のモードをラダープログラムから設定する
// -----------------------------------------------------------
// 関数名: VrgpioSetting
//
// 引数:
// 入力部ラダースライス生成
// inputLd:	[]*ldexemodel.InputLdexeModel
// 仮想gpio
// vrgpio:	map[string]*vrgpiomodel.VRgpio
//
// 戻り値: bool
// true:	成功
// false:	失敗
//
// 最初に入力部を見て変更し、次に出力部を見て変更(設定上書き)
// ===========================================================
func VrgpioSetting(
	inputLd []*ldexemodel.InputLdexeModel,
	vrgpio map[string]*vrgpiomodel.VRgpio,
) bool {
	// 入力部を見る for ループ
	// 各ラダープログラムの行ごと見る
	for _, ldSlice := range inputLd {
		// 行の中を検査する
		for _, ld := range ldSlice.InputLd {
			// gpioを参照していたら
			// モードを入力モードに
			if ld.NodeType == "gpA" || ld.NodeType == "gpB" {
				// 注意: NodeName は gpio指定の時だけ
				// Gpio数字 のようにしなければならない
				if !VrgpioModeChange(ld.NodeName, "input", vrgpio) {
					return false
				}
			}
		}
	}

	// 出力部を見る for ループ
	for _, ldSlice := range inputLd {
		if ldSlice.OutputKey.NodeType == "gpio" {
			if !VrgpioModeChange(
				ldSlice.OutputKey.NodeName,
				"output",
				vrgpio,
			) {
				return false
			}
		}
	}

	return true
}