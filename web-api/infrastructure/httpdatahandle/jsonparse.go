package httpdatahandle

import (
	"encoding/json"
	"log"
	"net/http"
)

func HttpJsonParse(r *http.Request) (interface{}, error) {
	body, err := DataRetrieval(r)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	var data interface{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return data, nil
}