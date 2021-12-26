package controlers

import (
	"fmt"
	"log"
	"plc-web-api/interfaces/httpdatahandle"
	"plc-web-api/plcengine/processing/gpiooperation/virtualgpio"
	"plc-web-api/plcengine/processing/ladderdebug"
	"plc-web-api/plcengine/processing/ladderrun"
)

// ラダープログラム デバッグ
func LdDebug(ladder interface{}) (
	[]httpdatahandle.IOoutputRes,
	error,
) {
	// ラダープログラム解析
	// ノードの存在位置の確認
	nodeExist, err := ladderdebug.NodeCheckExistence(ladder)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	// 接続確認から入出力の振り分けまで
	IOpointSlice, err := ladderdebug.LdContactCheck(ladder, nodeExist)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	// 実行用ラダーへ変換する
	ldConvertSlice, err := ladderdebug.LadderConvert(ladder, IOpointSlice)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	// マッピングされた出力部からスライスを生成する
	outputStateSlice := ladderdebug.CreateOutputStateSlice(ldConvertSlice)

	// ------------------------------------------
	// 仮想gpio関連
	// ------------------------------------------
	// 仮想gpioマッピング
	vrgpio := virtualgpio.VirtualGpioMapping()
	// 仮想gpio setting
	if !virtualgpio.VrgpioSetting(ldConvertSlice, vrgpio) {
		fmt.Println("gpio setting missed.")
		return nil, err
	}

	// 入出力の反映
	result := ladderrun.WebReflectionOfIO(
		ldConvertSlice,			// 入力部ラダースライス
		outputStateSlice,	// 出力保持スライス
		vrgpio,						// virtual gpio
	)
	if !result {
		return nil, err
	}

	// プログラムの実行
	result, IOop := ladderrun.WebDebugLadderPlay(
		ldConvertSlice,			// 入力部ラダースライス
		outputStateSlice,	// 出力保持スライス
		vrgpio,						// virtual gpio
	)
	if !result {
		fmt.Println("processing missed.")
		return nil, err
	}

	return IOop, err
}