package services

import "github.com/mmm29/pollnow_backend/server/app/repo"

type PollService struct {
	repo *repo.PollRepository
}

func NewPollService(repo *repo.PollRepository) *PollService {
	return &PollService{
		repo,
	}
}

func (svc *PollService) CreatePoll() {

}
