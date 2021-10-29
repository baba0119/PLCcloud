package ladderdebug

import (
	"fmt"
	"plc-web-api/plcengine/datamodel/debugmodels"

	"github.com/koron/go-dproxy"
)

// ---------------------------------------------
// ノードの存在確認を行う
//
// 引数:
// ladder: map[string]interface{}
//
// 戻り値:
// どこにノードがあるかの座標リスト
// ---------------------------------------------
func NodeCheckExistence(ladder interface{}) ([]debugmodels.NodePoint, error) {
	var err error
	var NodeCoordinate debugmodels.NodePoint

	ld := dproxy.New(ladder).M("ladder")

	// レコード数(行数)の確認
	var i, nodeQua int
	for i = 0; ; i++ {
		// レコードの存在確認
		_, err := ld.A(i).M("id").String()
		if err != nil {
			break
		}

		for j := 0; ; j++ {
			isProof, err :=
				ld.A(i).M("ladderData").A(j).M("isProof").Bool()
			if err != nil {
				break
			}
			if isProof {
				nodeQua++
			}
		}
	}
	fmt.Println(nodeQua)

	NodeExistList := make([]debugmodels.NodePoint, nodeQua)

	qua := 0
	for y := 0; y < i ; y++ {
		for x := 0; ; x++ {
			isProof, err :=
				ld.A(y).M("ladderData").A(x).M("isProof").Bool()
			if err != nil {
				break
			}
			if isProof {
				NodeCoordinate.X = x
				NodeCoordinate.Y = y
				NodeExistList[qua] = NodeCoordinate
				qua++
			}
		}
	}

	return NodeExistList, err
}