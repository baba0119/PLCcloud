package ladderrun

import (
	"fmt"
	"plc-web-api/interfaces/httpdatahandle"
	"plc-web-api/plcengine/datamodel/ldexemodel"
	"plc-web-api/plcengine/datamodel/vrgpiomodel"
)

func WebDebugLadderPlay(
	inputLdSlice 	[]*ldexemodel.InputLdexeModel,
	opStateSlice 	map[string]*ldexemodel.OutputLdexeModel,
	vrgpio				map[string]*vrgpiomodel.VRgpio,
	// uniqueOpSlice	*ldexemodel.UniqueOutputStateModel,
) (
	bool,
	[]httpdatahandle.IOoutputRes,
) {
	OpStateSliceCache := make(map[string]*ldexemodel.OutputLdexeModel)
	vrgpioCache := make(map[string]*vrgpiomodel.VRgpio)
	stateDiff := true

	// キャッシュへマップをコピー
	opStateMapCopy(OpStateSliceCache, opStateSlice)
	vrgpioMapCopy(vrgpioCache, vrgpio)

	for stateDiff {
		for _, ld := range inputLdSlice {
			// ラダープログラム処理 ture or false return
			outCome, result := BlockInnerProcessing(
				ld.InputLd[:],
				opStateSlice,
				vrgpio,
			)
			// もし処理に失敗したら
			if !result {
				fmt.Println("processing missed.")
				return false, nil
			}
			// 出力dispatcher 呼出し
			if !Dispatcher(
				outCome,
				ld.OutputKey,
				opStateSlice,
				vrgpio,
			) {
				return false, nil
			}
		}

		// 出力スライスとキャッシュを評価
		// true -> 差分あり false -> 差分なし
		stateDiff = opStateComparison(OpStateSliceCache, opStateSlice) || vrgpioComparison(vrgpioCache, vrgpio)

		// 違う場合
		// キャッシュへ値の代入、繰り返し
		// キャッシュへマップをコピー
		opStateMapCopy(OpStateSliceCache, opStateSlice)
		vrgpioMapCopy(vrgpioCache, vrgpio)
	}

	// 出力と状態の取り出し
	IOop := make([]httpdatahandle.IOoutputRes, 0)

	for key, value := range vrgpio {
		if value.GpioMode == "output" {
			IOop = append(IOop, httpdatahandle.IOoutputRes{
				NodeName: key,
				State:    value.GpioState,
			})
		}
	}

	for key, value := range opStateSlice {
		IOop = append(IOop, httpdatahandle.IOoutputRes{
			NodeName: key,
			State:    value.State,
		})
	}

	return true, IOop
}