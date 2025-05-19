package server

import (
	"github.com/mmm29/pollnow_backend/server/app"
	"github.com/mmm29/pollnow_backend/server/app/services"
	"github.com/mmm29/pollnow_backend/server/server/store"
)

func NewApp(store *store.Store) *app.App {
	return &app.App{
		Poll: services.NewPollService(store.PollRepo),
	}
}
