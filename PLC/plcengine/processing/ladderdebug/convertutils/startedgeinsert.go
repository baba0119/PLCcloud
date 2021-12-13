package convertutils

import (
	"log"
	"PLC/plcengine/datamodel/ldexemodel"

	"github.com/koron/go-dproxy"
)

func StartEdgeInsert(
	ld dproxy.Proxy,
	xa int,
	y int,
	inputLD []*ldexemodel.InputLdModel,
	isStartBifu bool,
	blockName string,
) (
	[]*ldexemodel.InputLdModel,
	error,
) {
	name, err := ld.A(y).M("ladderData").A(xa+1).M("ladderNode").M("name").String()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	var pos int
	for i, node := range inputLD {
		if node.NodeName == name {
			pos = i
			break
		}
	}

	inputLD = append(inputLD[:pos+1], inputLD[pos:]...)
	inputLD[pos] = &ldexemodel.InputLdModel{
		NodeName: blockName,
		NodeType: "blockSp",
		IsColSp:  isStartBifu,
		IsColEp:  false,
	}

	return inputLD, nil
}