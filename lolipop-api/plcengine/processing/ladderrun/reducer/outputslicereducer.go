package reducer

import (
	"lolipop-api/plcengine/datamodel/ldexemodel"
)

// 引数として必要な情報
// - 出力保持スライス
// - vrio の名前
// - true or false
// ---------------------------------------------
// 引数:
// vrio:		string
// output:	bool
// vrgpio:	map[string]*vrgpiomodel.VRgpio
//
// 戻り値:bool
// true:	成功
// false:	失敗
// ---------------------------------------------
func OutputSlice(
	vrio string,
	output bool,
	opStateSlice	map[string]*ldexemodel.OutputLdexeModel,
) bool {
	for str := range opStateSlice {
		if str == vrio {
			opStateSlice[vrio] = &ldexemodel.OutputLdexeModel{
				NodeType: "vrio",
				State:    output,
			}
			return true
		}
	}
	return false
}