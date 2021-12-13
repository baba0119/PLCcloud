package ladderdebug

import (
	// "fmt"
	"log"
	"PLC/plcengine/datamodel/debugmodels"

	"github.com/koron/go-dproxy"
)

// ---------------------------------------------
// ラダープログラムの接続確認を行う
//
// 引数:
// ladder: interface{}
// nodeExist: []debugmodels.NodeCoordinate
//
// 戻り値:
// 入出力座標スライス
// ---------------------------------------------
func LdContactCheck(
	ladder     interface{},
	nodeExist  []debugmodels.NodePoint,
) ([]*debugmodels.IOpointFlame, error) {
	var err error
	var IOpointSlice []*debugmodels.IOpointFlame

	// ラダープログラムの取り出し
	ld := dproxy.New(ladder).M("ladder")

	// 出力の取り出し
	for y := 0; ; y++ {
		// レコードの存在確認
		_, err = ld.A(y).M("id").String()
		if err != nil {
			err = nil
			break
		}

		isProof, err := ld.A(y).M("ladderData").A(9).M("isProof").Bool()
		if err != nil {
			break
		}

		if isProof {
			var output debugmodels.NodePoint
			output.X = 9
			output.Y = y

			IOdata := debugmodels.IOpointFlame{
				OutputPoint:  output,
				LdPointSlice: []debugmodels.NodePoint{},
			}
			IOpointSlice = append(IOpointSlice, &IOdata)
		}
	}

	if err != nil {
		log.Fatal(err)
		return IOpointSlice, err
	}

	// 出力ごとのループ
	// ラダープログラム(非構造化json) を見る
	for i, IOnodePoints := range IOpointSlice {
		for x := 9; x >= 1 ; x-- {
			// まずほしいのは x(現時点) の y座標
			// x が同じ要素を取り出す
			var NodePointSlice []debugmodels.NodePoint

			// x = 9 出力座標を見る
			// 出力座標はマッピング済
			// x < 9 入力座標スライスを見る
			switch {

			case x < 9 :
				// x の同じ入力座標スライスを取り出し
				// ノードが複数ある場合はスライスを作る
				for _, inputPoint := range IOnodePoints.LdPointSlice {
					if inputPoint.X == x {
						NodePointSlice = append(NodePointSlice, inputPoint)
					}
				}

			case x == 9:
				// 出力座標を取り出して入れる
				NodePointSlice = append(NodePointSlice, IOnodePoints.OutputPoint)
			}
			// -- 関わる入力座標の取り出しが終わり --

			// xが同じノードから上下接続を見る
			// xが被っている全てのノードに対して行う
			for _, nodePoint := range NodePointSlice {
				// 高さ保持領域の定義
				type heightFlame struct {
					high int
					low  int
				}
				var height heightFlame

				// 上は y をデクリメント
				// 下は y をインクリメント
				// 上を見てから下を見る
				// 高さを特定してから、y をデクリメントして見ていく
				// isProof, err := ld.A(y).M("ladderData").A(9).M("isProof").Bool()

				// 初期状態定義
				height.high = nodePoint.Y
				height.low = nodePoint.Y

				x := nodePoint.X - 1

				// 一番上を見る
				isCol, err := ld.A(height.high).M("ladderData").A(x).M("colState").M("isUpCol").Bool();
				if err != nil {
					break
				}
				for isCol {
					height.high--
					isCol, err = ld.A(height.high).M("ladderData").A(x).M("colState").M("isUpCol").Bool();
					if err != nil {
						break
					}
				}

				// 一番下を見る
				isCol, err = ld.A(height.low).M("ladderData").A(x).M("colState").M("isDownCol").Bool();
				if err != nil {
					break
				}
				for isCol {
					height.low++
					isCol, err = ld.A(height.low).M("ladderData").A(x).M("colState").M("isDownCol").Bool();
					if err != nil {
						break
					}
				}

				// fmt.Printf("height.high\t= %v\n", height.high)
				// fmt.Printf("height.low\t= %v\n", height.low)

				// ノードの座標スライスの編集
				for y := height.high; y <= height.low; y++ {
					isProof, err := ld.A(y).M("ladderData").A(x).M("isProof").Bool()
					if err != nil {
						break
					}

					// ノードが存在した場合にノードを押し込む
					if isProof {
						IOpointSlice[i].LdPointSlice = append(
							IOpointSlice[i].LdPointSlice,
							debugmodels.NodePoint{
								X: x,
								Y: y,
							},
						)
					}
				}
			}

			// 被っているノードをそれぞれ削除する
			for j, NodePoint := range IOpointSlice[i].LdPointSlice {
				for z := j + 1; z < len(IOpointSlice[i].LdPointSlice); z++ {
					if NodePoint == IOpointSlice[i].LdPointSlice[z] {
						IOpointSlice[i].LdPointSlice = append(
							IOpointSlice[i].LdPointSlice[:z],
							IOpointSlice[i].LdPointSlice[z+1:]...,
						)
					}
				}
			}
		}
	}

	return IOpointSlice, err
}