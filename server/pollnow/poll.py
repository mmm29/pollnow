from typing import List
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import select

from .dto import PollForm, PollResponse
from .models import Poll, PollOption
from .mapping import map_poll_to_response
from .store import get_session, Session
from .errors import ResourceNotFound

router = APIRouter()


class CreatePollResponse(BaseModel):
    poll_id: str


@router.post("/poll", response_model=CreatePollResponse)
async def create_poll(poll_form: PollForm, session: Session = Depends(get_session)):
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


@router.get("/poll/{poll_id}", response_model=PollResponse)
async def get_poll_by_id(poll_id: int, session: Session = Depends(get_session)):
    poll = session.exec(select(Poll).where(
        Poll.id == poll_id
    )).one_or_none()

    if poll is None:
        raise ResourceNotFound()

    return map_poll_to_response(poll)


@router.get("/poll", response_model=List[PollResponse])
async def get_all_polls(session: Session = Depends(get_session)):
    polls = session.exec(select(Poll)).all()
    return list(map(map_poll_to_response, polls))
