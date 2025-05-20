from typing import Optional, List
from pydantic import BaseModel

# from .models import Poll


class PollOptionForm(BaseModel):
    text: str


class PollForm(BaseModel):
    title: str
    description: str
    options: List[PollOptionForm]


class PollOptionResponse(BaseModel):
    id: str
    text: str


class PollResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    options: List[PollOptionResponse]

    # @classmethod
    # def from_poll(cls, poll: Poll):
    #     return cls(
    #         id=poll.id,
    #         title=poll.title,
    #         description=poll.description,
    #         options=[PollOptionDesc(
    #             text=opt.text
    #         ) for opt in poll.options]
    #     )
