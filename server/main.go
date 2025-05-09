package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func MeHandler(writer http.ResponseWriter, req *http.Request) {
	fmt.Println("Me handler")
	writeSuccess(writer, "{}")
}

func LoginHandler(writer http.ResponseWriter, req *http.Request) {
	fmt.Println("Login handler")
	writeSuccess(writer, "{\"username\": \"asd\"}")
}

func writeSuccess(writer http.ResponseWriter, obj string) {
	writer.WriteHeader(200)
	writer.Write([]byte(obj))
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/me", MeHandler).Methods("GET")
	r.HandleFunc("/login", LoginHandler).Methods("POST")
	http.ListenAndServe(":8114", r)
}
