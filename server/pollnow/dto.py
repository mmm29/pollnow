from typing import Optional, List, Dict
from pydantic import BaseModel


class PollOptionForm(BaseModel):
    text: str


class PollForm(BaseModel):
    title: str
    description: str
    options: List[PollOptionForm]


class PollStatistics(BaseModel):
    distribution: Dict[str, int]


class PollOptionResponse(BaseModel):
    id: str
    text: str
    selected: bool


class PollResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    completed: bool
    can_edit: bool
    options: List[PollOptionResponse]
    statistics: PollStatistics


class PollCompletionRequest(BaseModel):
    option_id: str
