// ===========================================================
// PLCcloud - processing
// -----------------------------------------------------------
// ラダープログラムの解析/実行
// 実行/解析のアルゴリズムを持つパッケージ
// ===========================================================

// このパッケージは状態管理パッケージに使われるイメージ

//
// このパッケージの役割
//
/*
==============================================================
・JSONの解析/マッピング ＞＞ ladderdebug
　------------------------------------------------------------

　変換されたJSONラダーはmap[string]interface{}型

　＞入力は型アサーションしてグローバル変数にいれるだけ

　＞出力は
　　JSONの中身を一つ一つみて以下のスライスにデータを入力
　　していく。

　　「出力ノードスライス群」「出力参照スライス」
　　をそれぞれ作る

==============================================================

==============================================================
・ラダープログラムの実際の入出力 ＞＞ ladderrun
　------------------------------------------------------------

　- 変換されたラダープログラムを仮想動作させる
　　ブロック同士、ブロックと普通のNodeはAND演算
　　分岐始端から分岐終端もAND演算
　　分岐終端と分岐始端ではOR演算

==============================================================

==============================================================
・動作ログの作成 ＞＞ plclog
　------------------------------------------------------------

　最初はログを送ったりはしないが、コンソール上で動作確認
　をするためとる。

　コンソールに出力する用の関数もいくつか用意する。

==============================================================

==============================================================
・常にGPIOを監視/制御の反映 ＞＞ gpiooperation
　------------------------------------------------------------
　- 現実入力/出力と仮想入力/出力を対応させる

　goroutinで走らせるプログラムのパッケージ
　
　以下の二つを執り行うパッケージ
　- GPIOの入力反映
　- GPIOへ出力反映

　GPIOの状態を常にグローバル変数にマッピングし、
　その状態をラダープログラムのの実行の際は使う

==============================================================
*/

package processing