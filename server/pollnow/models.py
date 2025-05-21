from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship


class PollOption(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text: str
    poll_id: Optional[int] = Field(default=None, foreign_key='poll.id')
    poll: Optional["Poll"] = Relationship(back_populates='options')


class Poll(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: Optional[str]
    options: List["PollOption"] = Relationship(back_populates='poll')


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str
