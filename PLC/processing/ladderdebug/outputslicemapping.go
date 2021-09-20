package ladderdebug

import (
	"PLC/datamodel/ldexemodel"
)

// ---------------------------------------------
// 出力保持スライス生成用関数
//
// 引数:
// 入力部ラダー
// inputLd:	[]*ldexemodel.InputLdexeModel
//
// 戻り値:
// 出力保持マップスライス
// map[string]*OutputLdexeModel
//
// ladderdebug がこの関数を使う
// ---------------------------------------------
func CreateOutputStateSlice(inputLd []*ldexemodel.InputLdexeModel) map[string]*ldexemodel.OutputLdexeModel {
	opSateSlice := make(map[string]*ldexemodel.OutputLdexeModel)
	for _, value := range inputLd {
		if value.OutputKey.NodeType != "gpio" {
			opSateSlice[value.OutputKey.NodeName] = &ldexemodel.OutputLdexeModel{
				NodeType: value.OutputKey.NodeType,
				State:    false,
			}
		}
	}

	return opSateSlice
}