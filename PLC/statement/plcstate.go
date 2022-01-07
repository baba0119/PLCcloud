package statement

// 動作状態を規定する変数
// true => 動作  false => 停止
var PLCmode = false

// plcの識別idを格納する変数
var PLCid = ""

// LD言語でできたプログラムの格納
// json文字列の格納
var LdJSON = ""