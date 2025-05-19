package api

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (a *Api) registerAuthRoutes(router *mux.Router) {
	router.HandleFunc("/me", a.getMe).Methods("GET")
}

func (a *Api) getMe(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
	w.Write([]byte("{}"))
}
