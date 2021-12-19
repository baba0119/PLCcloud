package httpdatahandle

type User struct {
	Id       string `json:"id"`
	Password string `json:"password"`
}

type Project struct {
	UserId string `json:"userid"`
	Token  string `json:"token"`
	Name   string `json:"name"`
}

type ProjectReqFlame struct {
	Token     string `json:"token"`
	UserId    string `json:"userid"`
	ProjectId string `json:"projectid"`
}