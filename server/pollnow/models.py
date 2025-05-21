from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str

    poll_completions: List["PollCompletion"] = Relationship(
        back_populates='user')
    created_polls: List["Poll"] = Relationship(back_populates='creator')


class PollOption(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text: str
    poll_id: int = Field(foreign_key='poll.id')
    poll: "Poll" = Relationship(back_populates='options')


class Poll(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: Optional[str]
    creator_id: int = Field(foreign_key='user.id')

    creator: "User" = Relationship(back_populates='created_polls')
    options: List["PollOption"] = Relationship(back_populates='poll')
    completions: List["PollCompletion"] = Relationship(back_populates='poll')


class PollCompletion(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key='user.id')
    poll_id: int = Field(foreign_key='poll.id')
    option_id: int = Field(foreign_key='polloption.id')

    user: "User" = Relationship(back_populates='poll_completions')
    poll: "Poll" = Relationship(back_populates='completions')
    option: "PollOption" = Relationship()
