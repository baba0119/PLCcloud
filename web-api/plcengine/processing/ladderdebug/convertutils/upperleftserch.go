package convertutils

import "plc-web-api/plcengine/datamodel/debugmodels"

func UpperLeftSerch(
	ldPointSlice []debugmodels.NodePoint,
	xa int,
	xb int,
) ( int, int ) {
	x := -1
	y := -1
	// yの最も小さい座標を特定
	for _, point := range ldPointSlice {
		if point.X > xa && point.X <= xb && !point.Exist {
			if y == -1 || y > point.Y {
				y = point.Y
			}
		}
	}

	// そのyの中から最も小さいxの特定
	for _, point := range ldPointSlice {
		if point.X > xa && point.X <= xb && !point.Exist {
			if x == -1 || x > point.X && y == point.Y {
				x = point.X
			}
		}
	}

	return x, y
}