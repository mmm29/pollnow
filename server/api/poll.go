package api

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (a *Api) registerPollRoutes(router *mux.Router) {
	router.HandleFunc("/poll", a.createPoll).Methods("POST")
}

func (a *Api) createPoll(w http.ResponseWriter, r *http.Request) {

	w.WriteHeader(200)
	w.Write([]byte("{}"))
}
