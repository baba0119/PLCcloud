package ladderdebug

import (
	"fmt"
	"log"
	"plc-web-api/plcengine/datamodel/debugmodels"
	"plc-web-api/plcengine/datamodel/ldexemodel"
	"plc-web-api/plcengine/processing/ladderdebug/convertutils"

	"github.com/koron/go-dproxy"
)

func LadderConvert(
	ladder interface{},
	IOpointSlice []*debugmodels.IOpointFlame,
) (
	[]*ldexemodel.InputLdexeModel,
	error,
) {
	// ------------------------------------
	// この関数で扱うデータ
	//
	// 前のx 今のx
	// 非構造化ラダー
	// 入出力座標群
	// ------------------------------------

	ld := dproxy.New(ladder).M("ladder")
	ldConvertSlice := make([]*ldexemodel.InputLdexeModel, 1)

	// 入出力座標のまとまったスライスを for range で回す
	for _, IOpoints := range IOpointSlice {
		// -- 出力キーの作成 --
		// 出力座標の取り出し
		opX := IOpoints.OutputPoint.X
		opY := IOpoints.OutputPoint.Y

		// 出力キー作成
		name, err := ld.A(opY).M("ladderData").A(opX).M("ladderNode").M("name").String()
		if ( err != nil ) {
			log.Fatal(err)
			return nil, err
		}
		info, err := ld.A(opY).M("ladderData").A(opX).M("ladderNode").M("info").String()
		if ( err != nil ) {
			log.Fatal(err)
			return nil, err
		}

		opKey := ldexemodel.OutputKeyModel {
			NodeType: info,
			NodeName: name,
		}

		// -- 入力キーの作成 --
		ParentXa := -1
		ParentXb := 8

		// 入力部をスライスに追加
		inputLd := make([]*ldexemodel.InputLdModel, 0)
		inputLdSlice := &ldexemodel.InputLdexeModel{
			InputLd:   make([]*ldexemodel.InputLdModel, 0),
			OutputKey: opKey,
		}

		inputLd, _, err = convertutils.BlockInnerDebug(
			debugmodels.XabPointsModel{
				Xa: ParentXa,
				Xb: ParentXb,
			},
			inputLd,
			ld,
			IOpoints.LdPointSlice,
		)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}

		inputLdSlice.OutputKey = opKey
		inputLdSlice.InputLd = inputLd

		for _, data := range inputLd {
			fmt.Println(data)
		}
		fmt.Println(opKey)

		ldConvertSlice = append(ldConvertSlice, &ldexemodel.InputLdexeModel{
			InputLd:   inputLd,
			OutputKey: opKey,
		})
	}

	for _, data := range ldConvertSlice {
		fmt.Println(data.OutputKey)
	}

	return ldConvertSlice, nil
}