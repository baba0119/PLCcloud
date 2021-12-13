package convertutils

import (
	"fmt"
	"log"
	"PLC/plcengine/datamodel/debugmodels"
	"PLC/plcengine/datamodel/ldexemodel"

	"github.com/google/uuid"
	"github.com/koron/go-dproxy"
)

func BlockInnerDebug(
	XabPoints debugmodels.XabPointsModel,
	inputLdSlice []*ldexemodel.InputLdModel,
	ld dproxy.Proxy,
	ldPointSlice []debugmodels.NodePoint,
) (
	[]*ldexemodel.InputLdModel,
	[]debugmodels.NodePoint,
	error,
) {
	xa := XabPoints.Xa // 分岐始端のx座標
	xb := XabPoints.Xb // 分岐終端のx座標

	x1LeftUpperFlag := false
	counter := 0

	for PointExistence(ldPointSlice, xa, xb) {
		//
		// 次の接点の探索
		//
		x, y := UpperLeftSerch(ldPointSlice, xa, xb)
		fmt.Println(x, y)

		//
		// 座標スライスから今の接点を削除
		//
		for pos, point := range ldPointSlice {
			if x == 0 {
				x1LeftUpperFlag = true
			}
			if point.X == x && point.Y == y {
				ldPointSlice[pos].Exist = true
			}
		}

		//
		// ノードを変換する
		//
		name, err := ld.A(y).M("ladderData").A(x).M("ladderNode").M("name").String()
		if err != nil {
			log.Fatal(err)
			return nil, nil, err
		}
		info, err := ld.A(y).M("ladderData").A(x).M("ladderNode").M("info").String()
		if err != nil {
			log.Fatal(err)
			return nil, nil, err
		}

		if info != "contact" {
			// スライスの末尾へ追加
			inputLdSlice = append(inputLdSlice, &ldexemodel.InputLdModel{
				NodeName: name,
				NodeType: info,
				IsColSp:  false,
				IsColEp:  false,
			})
		}

		//
		// 接続を見て指定の処理を行う
		//
		// 左側上との接続
		var leftUpperConn bool
		if x != 0 {
			leftUpperConn, err = ld.A(y).M("ladderData").A(x-1).M("colState").M("isUpCol").Bool()
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}
		} else if counter != 0 {
			leftUpperConn = x1LeftUpperFlag
		}

		// 右上側との接続
		rightUpperConn, err := ld.A(y).M("ladderData").A(x).M("colState").M("isUpCol").Bool()
		if err != nil {
			log.Fatal(err)
			return nil, nil, err
		}

		// 下との接続
		rightLowerConn, err := ld.A(y).M("ladderData").A(x).M("colState").M("isDownCol").Bool()
		if err != nil {
			log.Fatal(err)
			return nil, nil, err
		}

		// fmt.Println("leftUpperConn", leftUpperConn)
		// fmt.Println("rightUpperConn", rightUpperConn)
		// fmt.Println("rightLowerConn", rightLowerConn)

		// どことも縦に繋がっていないとき
		if !leftUpperConn && !rightUpperConn && !rightLowerConn {
			counter++
			continue
		}

		// 下と繋がっていないとき
		if !rightLowerConn {

			// 右が上と接続
			if rightUpperConn {
				inputLdSlice[len(inputLdSlice)-1].IsColEp = true
			}

			// 左が上と接続
			if x == 0 {
				for _, point := range ldPointSlice {
					if point.X == x && point.Y < y {
						leftUpperConn = true
					}
				}
			}
			if leftUpperConn {
				inputLdSlice[len(inputLdSlice)-1].IsColSp = true
			}
		}

		// ここまでくれば必ず下と繋がっている
		// 並列ノードの確認
		parallelNode := false
		for _, point := range ldPointSlice {
			if xa < point.X && point.X <= x && y < point.Y {
				parallelNode = true
			}
		}
		if !parallelNode {
			xa = x
			counter++
			continue
		}

		var isColSp, isColEp bool
		switch {

		// 左が不一致 右が一致
		case XabPoints.Xa != xa && xb == x:
			// fmt.Println("左が不一致 右が一致")
			isColSp = false
			isColEp = true

			// ブロック名の作成
			u, err := uuid.NewRandom()
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}
			blockName := u.String()

			// ブロック始端挿入
			inputLdSlice, err = StartEdgeInsert(
				ld,
				xa,
				y,
				inputLdSlice,
				isColSp,
				blockName,
			)
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}

			// ブロック内処理
			fmt.Println(xa, x)
			inputLdSlice, ldPointSlice, err = BlockInnerDebug(
				debugmodels.XabPointsModel{
					Xa: xa,
					Xb: x,
				},
				inputLdSlice,
				ld,
				ldPointSlice,
			)
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}

			// ブロック終端挿入
			inputLdSlice = append(inputLdSlice, &ldexemodel.InputLdModel{
				NodeName: blockName,
				NodeType: "blockEp",
				IsColSp:  false,
				IsColEp:  isColEp,
			})
			xa = XabPoints.Xa

		// 左が一致 右が不一致
		case XabPoints.Xa == xa && xb != x:
			// fmt.Println("左が一致 右が不一致")
			isColSp = true
			isColEp = false
			if counter == 0 {
				isColSp = false
			}

			// ブロック名の作成
			u, err := uuid.NewRandom()
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}
			blockName := u.String()

			// ブロック始端挿入
			inputLdSlice, err = StartEdgeInsert(
				ld,
				xa,
				y,
				inputLdSlice,
				isColSp,
				blockName,
			)
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}

			// fmt.Println("ブロック始端挿入完了")

			// ブロック内処理
			fmt.Println(xa, x)
			inputLdSlice, ldPointSlice, err = BlockInnerDebug(
				debugmodels.XabPointsModel{
					Xa: xa,
					Xb: x,
				},
				inputLdSlice,
				ld,
				ldPointSlice,
			)
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}

			// fmt.Println("ブロック内処理完了")

			// ブロック終端挿入
			inputLdSlice = append(inputLdSlice, &ldexemodel.InputLdModel{
				NodeName: blockName,
				NodeType: "blockEp",
				IsColSp:  false,
				IsColEp:  isColEp,
			})

			xa = x

		// 両側不一致
		case XabPoints.Xa != xa && xb != x:
			// fmt.Println("両側不一致")
			isColSp = false
			isColEp = false

			// ブロック名の作成
			u, err := uuid.NewRandom()
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}
			blockName := u.String()

			// ブロック始端挿入
			inputLdSlice, err = StartEdgeInsert(
				ld,
				xa,
				y,
				inputLdSlice,
				isColSp,
				blockName,
			)
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}

			// ブロック内処理
			fmt.Println(xa, x)
			inputLdSlice, ldPointSlice, err = BlockInnerDebug(
				debugmodels.XabPointsModel{
					Xa: xa,
					Xb: x,
				},
				inputLdSlice,
				ld,
				ldPointSlice,
			)
			if err != nil {
				log.Fatal(err)
				return nil, nil, err
			}

			// ブロック終端挿入
			inputLdSlice = append(inputLdSlice, &ldexemodel.InputLdModel{
				NodeName: blockName,
				NodeType: "blockEp",
				IsColSp:  false,
				IsColEp:  isColEp,
			})
			xa = x

		}

		counter++
	}

	return inputLdSlice, ldPointSlice, nil
}