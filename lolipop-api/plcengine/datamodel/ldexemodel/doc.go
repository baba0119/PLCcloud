// ===========================================================
// PLCcloud - datamodel - ladderexe
// -----------------------------------------------------------
// ラダープログラムの処理系の核となる
// 構造体, グローバル変数の置き所
// ===========================================================

//
// 構造体一覧
//
/*
==============================================================
　構造体一覧
　------------------------------------------------------------

　＜ラダープログラム入力関連＞
　　- 入力部ラダー構造体

　＜ラダープログラム出力関連＞
　　- 特殊出力状態把持構造体
　　- 出力保持構造体

==============================================================
*/

//
// 入力部ラダー構造体
//
/*
==============================================================
　入力部ラダー構造体
　------------------------------------------------------------

　＜フィールド＞
　　- nodeName
　　- nodeInfo
　　- isColSp
　　- isColEp

==============================================================
*/

//
// 特殊出力状態把持構造体
//
/*
==============================================================
　特殊出力状態把持構造体
　------------------------------------------------------------

　タイマー状態把持構造体
　＜フィールド＞
　　- delayTime
　　- nowTime

　カウンタ状態把持構造体
　＜フィールド＞
　　- limitCount
　　- nowCount
　　- wasState
　　- edge

==============================================================
*/

//
// 出力保持構造体
//
/*
==============================================================
　出力保持構造体
　------------------------------------------------------------

　＜フィールド＞
　　- name
　　- type
　　- state

==============================================================
*/

package ldexemodel