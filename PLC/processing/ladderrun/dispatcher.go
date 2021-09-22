package ladderrun

import (

)

// ---------------------------------------------
// 出力処理のdispatcher
// この関数から出力処理が始まる
//
// 引数:
// ldOutputKey:		OutputKeyModel
// opStateSlice:	map[string]*ldexemodel.OutputLdexeModel
// vrgpio:				map[string]*vrgpiomodel.VRgpio
//
// 戻り値:bool
// true:	成功
// false:	失敗
//
// ladderdebug がこの関数を使う
// ---------------------------------------------