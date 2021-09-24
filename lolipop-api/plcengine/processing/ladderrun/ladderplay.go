package ladderrun

import (
	"lolipop-api/plcengine/datamodel/ldexemodel"
	"lolipop-api/plcengine/datamodel/vrgpiomodel"
	"fmt"
)

// ---------------------------------------------
// この関数から出力処理が始まる
//
// 引数:
// inputLdSlice:	[]*ldexemodel.InputLdexeModel
// opStateSlice:	map[string]*ldexemodel.OutputLdexeModel
// vrgpio:				map[string]*vrgpiomodel.VRgpio
// uniquiOpSlice:	*UniqueOutputStateModel(まだ実装しない)
//
// 引数はソフトウェアで欠かせないエンティティをすべて
// 受け取る
//
// 戻り値:bool
// true:	成功
// false:	失敗
// ---------------------------------------------
func LadderPlay(
	done chan bool,
	inputLdSlice 	[]*ldexemodel.InputLdexeModel,
	opStateSlice 	map[string]*ldexemodel.OutputLdexeModel,
	vrgpio				map[string]*vrgpiomodel.VRgpio,
	// uniquiOpSlice	*ldexemodel.UniqueOutputStateModel,
) bool {
	OpStateSliceCache := make(map[string]*ldexemodel.OutputLdexeModel)
	vrgpioCache := make(map[string]*vrgpiomodel.VRgpio)
	stateDiff := false

	// キャッシュへマップをコピー
	opStateMapCopy(OpStateSliceCache, opStateSlice)
	vrgpioMapCopy(vrgpioCache, vrgpio)

	for {

		// 入力があったときにラダープログラム動作
		// 前回と出力の状態が違うときにも動作
		// 出力:
		// opStateSlice と vrgpio が出力
		if <-done || stateDiff {
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
					return false
				}
				// 出力dispatcher 呼出し
				if !Dispatcher(
					outCome,
					ld.OutputKey,
					opStateSlice,
					vrgpio,
				) {
					return false
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
	}
}

// マップのコピー(参照渡しを避ける)
// 出力保持マップのコピー
func opStateMapCopy(cache, data map[string]*ldexemodel.OutputLdexeModel) {
	for key, value := range data {
		cache[key] = &ldexemodel.OutputLdexeModel{
			NodeType: value.NodeType,
			State:    value.State,
		}
	}
}

// virtual gpio のコピー(参照渡しを避ける)
func vrgpioMapCopy(cache, data map[string]*vrgpiomodel.VRgpio) {
	for key, value := range data {
		cache[key] = &vrgpiomodel.VRgpio{
			GpioMode:  value.GpioMode,
			GpioState: value.GpioState,
		}
	}
}

// 出力保持マップのキャッシュとの比較
// 戻り値
// 差分があったとき -> true
// 差分がなかった時 -> false
func opStateComparison(cache, data map[string]*ldexemodel.OutputLdexeModel) bool {
	for key, value := range data {
		if cache[key].State != value.State {
			return true
		}
	}
	return false
}

// virtual gpio のキャッシュとの比較
// 戻り値
// 差分があったとき -> true
// 差分がなかった時 -> false
func vrgpioComparison(cache, data map[string]*vrgpiomodel.VRgpio) bool {
	for key, value := range data {
		if cache[key].GpioState != value.GpioState {
			return true
		}
	}
	return false
}