package convertutils

import "plc-web-api/plcengine/datamodel/debugmodels"

// xa から xb までの間に接点があるか確かめる関数
func PointExistence(
	ldPointSlice []debugmodels.NodePoint,
	xa int,
	xb int,
) bool {
	for _, point := range ldPointSlice {
		if point.X > xa && point.X <= xb && !point.Exist {
			return true
		}
	}

	return false
}