package main

import (
	"github.com/mmm29/pollnow_backend/server/server"
)

func main() {
	server := server.NewServer()
	server.Run()
}
