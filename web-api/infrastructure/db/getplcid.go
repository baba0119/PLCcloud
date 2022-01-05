package db

func GetPLCId(projectid string) (string, error) {
	var plcid string
	err := Db.QueryRow("SELECT plcid FROM projects WHERE projectid = ?", projectid).Scan(&plcid)
	return plcid, err
}