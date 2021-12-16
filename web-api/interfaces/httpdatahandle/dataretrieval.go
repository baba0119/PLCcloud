package httpdatahandle

import (
	"io"
	"log"
	"net/http"
	"strconv"
)

func DataRetrieval(r *http.Request) ([]byte, error) {
	length, err := strconv.Atoi(r.Header.Get("Content-Length"))
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	body := make([]byte, length)
	_, err = r.Body.Read(body)
	if err != nil && err != io.EOF {
		log.Fatal(err)
		return nil, err
	}

	return body, nil
}