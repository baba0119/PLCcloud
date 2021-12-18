package httpdatahandle

type ErrorRes struct {
	 Types string
}

type LoginRes struct {
	Token string
	Id    string
}

type ProjectRes struct {
	Id   string
	Name string
}