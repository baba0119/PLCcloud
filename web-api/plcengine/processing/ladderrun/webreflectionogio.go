package ladderrun

import (
	"log"
	"plc-web-api/plcengine/datamodel/ldexemodel"
	"plc-web-api/plcengine/datamodel/vrgpiomodel"

	"github.com/koron/go-dproxy"
)

func WebReflectionOfIO(
	ladder interface{},
	opStateSlice map[string]*ldexemodel.OutputLdexeModel,
	vrgpio map[string]*vrgpiomodel.VRgpio,
) bool {
	// 入力を反映
	inputState := dproxy.New(ladder).M("input")
	elementCount, err := inputState.M("elementCount").Int64()
	if err != nil {
		log.Println(err)
		return false
	}

	for i := 0; i<int(elementCount); i++ {
		nodeName, err := inputState.M("stateList").A(i).M("nodeName").String()
		if err != nil {
			log.Println(err)
			return false
		}
		state, err := inputState.M("stateList").A(i).M("state").Bool()
		if err != nil {
			log.Println(err)
			return false
		}
		vrgpio[nodeName].GpioState = state
	}

	// 出力を反映
	outputState := dproxy.New(ladder).M("output")
	elementCount, err = outputState.M("elementCount").Int64()
	if err != nil {
		log.Println(err)
		return false
	}

	for i := 0; i<int(elementCount); i++ {
		nodeName, err := outputState.M("stateList").A(i).M("nodeName").String()
		if err != nil {
			log.Println(err)
			return false
		}
		nodeType, err := outputState.M("stateList").A(i).M("nodeType").String()
		if err != nil {
			log.Println(err)
			return false
		}
		state, err := outputState.M("stateList").A(i).M("state").Bool()
		if err != nil {
			log.Println(err)
			return false
		}

		// ノードの種類によって分岐
		switch nodeType {
		case "gpio":
			vrgpio[nodeName].GpioState = state
		case "vrio":
			opStateSlice[nodeName].State = state
		default:
			log.Println("種類が合致しませんでした")
			return false
		}
	}

	return true
}