from typing import List, Optional, Literal
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlmodel import select, delete

from .dto import PollCompletionRequest, PollForm, PollResponse, PollOptionResponse
from .models import Poll, PollCompletion, PollOption, User
from .store import get_session, Session
from .errors import InsufficientPermissions, ResourceNotFound, ValidationError
from .auth import get_session_user, require_user

router = APIRouter()


def can_user_edit_poll(user: User, poll: Poll) -> bool:
    return poll.creator_id == user.id


class CreatePollResponse(BaseModel):
    poll_id: str


def map_poll_to_response(poll: Poll, user: Optional[User], session: Session) -> PollResponse:
    selected_option_id = None
    if user is not None:
        completion = session.exec(select(PollCompletion).where(
            PollCompletion.poll_id == poll.id, PollCompletion.user_id == user.id)).one_or_none()
        if completion is not None:
            selected_option_id = completion.option_id

    can_edit = can_user_edit_poll(user, poll) if user else False

    options = [
        PollOptionResponse(
            id=str(option.id),
            text=option.text,
            selected=option.id == selected_option_id
        )
        for option in poll.options
    ]

    return PollResponse(
        id=str(poll.id),
        title=poll.title,
        description=poll.description,
        completed=selected_option_id is not None,
        options=options,
        can_edit=can_edit
    )


@router.post("/poll", response_model=CreatePollResponse)
async def create_poll(poll_form: PollForm, session: Session = Depends(get_session), user: User = Depends(require_user)):
    poll = Poll(
        title=poll_form.title,
        description=poll_form.description,
        creator=user
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


def find_poll_by_id(session: Session, poll_id: int) -> Poll:
    poll = session.exec(select(Poll).where(Poll.id == poll_id)).one_or_none()
    if poll is None:
        raise ResourceNotFound()

    return poll


@router.delete('/poll/{poll_id}')
async def delete_poll(poll_id: int, session: Session = Depends(get_session), user: Optional[User] = Depends(require_user)):
    poll = find_poll_by_id(session, poll_id)
    if not can_user_edit_poll(user, poll):
        raise InsufficientPermissions()

    session.exec(delete(Poll).where(Poll.id == poll_id))
    session.commit()


@router.get("/poll/{poll_id}", response_model=PollResponse)
async def get_poll_by_id(poll_id: int, session: Session = Depends(get_session), user: Optional[User] = Depends(get_session_user)):
    poll = find_poll_by_id(session, poll_id)
    return map_poll_to_response(poll, user, session)


@router.get("/poll", response_model=List[PollResponse])
async def get_polls(select_filter: Literal["all", "my"] = Query(alias='select'),
                    session: Session = Depends(get_session),
                    user: Optional[User] = Depends(get_session_user)):
    if select_filter == 'all':
        query = select(Poll)
    elif select_filter == 'my':
        query = select(Poll).where(Poll.creator_id == user.id)
    else:
        raise ValidationError('invalid param value')

    polls = session.exec(query).all()
    return list(map(lambda poll: map_poll_to_response(poll, user, session), polls))


@router.delete('/poll/{poll_id}/completion')
async def uncomplete_poll(poll_id: int, session: Session = Depends(get_session), user: User = Depends(require_user)):
    result = session.exec(delete(PollCompletion).where(
        PollCompletion.poll_id == poll_id, PollCompletion.user_id == user.id))
    session.commit()

    if result.rowcount == 0:
        raise ResourceNotFound()


@router.post('/poll/{poll_id}/completion')
async def complete_poll(poll_id: int, request: PollCompletionRequest, session: Session = Depends(get_session), user: User = Depends(require_user)):
    # Remove any previous completions
    session.exec(delete(PollCompletion).where(
        PollCompletion.poll_id == poll_id, PollCompletion.user_id == user.id))

    # Find poll by id
    poll = find_poll_by_id(session, poll_id)

    # Check if such option exists
    option = session.exec(select(PollOption).where(
        PollOption.id == request.option_id)).one_or_none()
    if option is None:
        raise ValidationError('No such option')

    completion = PollCompletion(
        poll=poll,
        option=option,
        user=user
    )

    session.add(completion)
    session.commit()
