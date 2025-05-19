package api

import (
	"github.com/gorilla/mux"
	"github.com/mmm29/pollnow_backend/server/app"
)

type Api struct {
	app *app.App
}

func NewApi() *Api {
	return &Api{}
}

func (a *Api) RegisterRoutes(router *mux.Router) {
	a.registerAuthRoutes(router)
	a.registerPollRoutes(router)
}
