// ===========================================================
// PLCcloud - processing - gpiooperation
// -----------------------------------------------------------
// gpioの状態を管理する仮想gpioの実装
// 実態を伴うgpioの制御がobserver(仮想gpioを見る)の機能を持つ
// ===========================================================

//
// 実装機能について
//
/*
==============================================================
・実装機能について
　------------------------------------------------------------

- virtual gpio
  仮想的にgpioをマッピングする

- gpio observer
  gpioを常に監視し、変化をとらえる

- gpio control
  変化を検知したらgpioをコントロールする

# ソフトウェア階層
virtual gpio		仮想gpioマッピング階層
> gpio observer	仮想gpio差分検出
> gpio control	現実gpio制御

常にgpioの状態を監視し続ける
-> gotoutinで動かす

・仮想gpioの作成
・外部から仮想gpioの操作をするためのAPIの提供
・仮想gpioの読み取り
・gpioの入力を読み取り -> 仮想gpioへ反映ずる
・仮想gpioを読み取り、出力に反映する

==============================================================
*/

package gpiooperation