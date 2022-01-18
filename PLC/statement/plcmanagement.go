package statement

import (
	// "PLC/plcengine/plctest"
	"PLC/plcengine/processing/gpiooperation"
	"PLC/plcengine/processing/gpiooperation/virtualgpio"
	"PLC/plcengine/processing/ladderdebug"
	"PLC/plcengine/processing/ladderrun"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func PLCManagement() {
	for {
		if PLCmode {
			// 解析
			// ------------------------------------------
			// ラダープログラムjson取得
			// ------------------------------------------
			/* --
				とりあえず SelfholdingMapping()
				と同じものを吐くかどうかでチェック
			-- */
			ladder, err := os.ReadFile("./ld.json")
			if err != nil {
				log.Fatal(err)
				return
			}

			var jsonData interface{}
			err = json.Unmarshal(ladder, &jsonData)
			if err != nil {
				log.Fatal(err)
				return
			}

			// ノードの存在位置の確認
			nodeExist, err := ladderdebug.NodeCheckExistence(jsonData)
			if err != nil {
				log.Fatal(err)
				return
			}

			// 接続確認から入出力の振り分けまで
			IOpointSlice, err := ladderdebug.LdContactCheck(jsonData, nodeExist)
			if err != nil {
				log.Fatal(err)
				return
			}
			for i, p := range IOpointSlice {
				fmt.Println(i, p)
			}

			// 実行用ラダーへ変換する
			ldConvertSlice, err := ladderdebug.LadderConvert(jsonData, IOpointSlice)
			if err != nil {
				log.Fatal(err)
				return
			}

			for _, data := range ldConvertSlice {
				for _, ld := range data.InputLd {
					fmt.Println(ld)
				}
				fmt.Println(data.OutputKey)
			}

			// ------------------------------------------
			// 出力部データスライスマッピング
			// ------------------------------------------
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
				return
			}
			// gpio設定変更確認
			fmt.Println("virtual gpio 初期状態")
			virtualgpio.ShowVirtualGpio(vrgpio)
			fmt.Println()

			// 実行
			// 仮想gpio模擬入力機構
			// 実行中はコマンドプロンプトからGpioの入力を変更できる
			// input モードのとこのみ変更可能
			// ゴルーチンで処理を動かす
			done := make(chan bool)
			delay := make(chan bool)

			// gpio差分検出
			go gpiooperation.Observer(done, delay, vrgpio)

			// コマンドで vrgpio の操作
			// go plctest.VrgpioSimulated(done, vrgpio)

			// ラダープログラムの動作(無限ループ)
			// ラダープレイの中で無限ループ
			if !ladderrun.LadderPlay(
				done,							// ゴルーチンチャネル
				delay,						// 動作終了伝達
				ldConvertSlice,		// 入力部ラダースライス
				outputStateSlice,	// 出力保持スライス
				vrgpio,						// virtual gpio
			) {
				fmt.Println("processing missed.")
				return
			}
		}
	}
}