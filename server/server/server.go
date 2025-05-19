package server

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mmm29/pollnow_backend/server/api"
	"github.com/mmm29/pollnow_backend/server/app"
	"github.com/mmm29/pollnow_backend/server/server/store"
	"github.com/mmm29/pollnow_backend/server/server/store/sql"
)

type Server struct {
	router *mux.Router
	app    *app.App
	store  *store.Store
}

func NewServer() *Server {
	router := mux.NewRouter()
	store := newStore()
	app := NewApp(store)

	api := api.NewApi()
	api.RegisterRoutes(router)

	return &Server{
		router,
		app,
		store,
	}
}

func newStore() *store.Store {
	return sql.New()
}

func (server *Server) Run() {
	http.ListenAndServe(":8114", server.router)
}
