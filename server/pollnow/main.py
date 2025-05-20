from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlmodel import select

from .dto import PollForm, PollResponse
from .models import Poll, PollOption
from .mapping import map_poll_to_response
from .store import get_db


app = FastAPI()


class CreatePollResponse(BaseModel):
    poll_id: str


@app.post("/poll", response_model=CreatePollResponse)
def create_poll(poll_form: PollForm):
    with get_db() as session:
        poll = Poll(
            title=poll_form.title,
            description=poll_form.description
        )

        options = []
        for form_option in poll_form.options:
            option = PollOption(text=form_option.text, poll=poll)
            options.append(option)

        for option in options:
            session.add(option)
        session.add(poll)

        session.commit()

        for option in options:
            session.refresh(option)
        session.refresh(poll)

        return CreatePollResponse(poll_id=str(poll.id))


class ResourceNotFound(HTTPException):
    def __init__(self):
        super().__init__(404, 'Resource not found')


@app.get("/poll/{poll_id}", response_model=PollResponse)
def get_poll_by_id(poll_id: int):
    with get_db() as session:
        poll = session.exec(select(Poll).where(
            Poll.id == poll_id
        )).one_or_none()

        if poll is None:
            raise ResourceNotFound()

        return map_poll_to_response(poll)


@app.get("/poll", response_model=List[PollResponse])
def get_all_polls():
    with get_db() as session:
        polls = session.exec(select(Poll)).all()
        return list(map(map_poll_to_response, polls))
