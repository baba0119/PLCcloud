package controlers

import "plc-web-api/infrastructure/db"

func PLCId(projectid string) (string, error) {
	plcid, err := db.GetPLCId(projectid)
	return plcid, err
}