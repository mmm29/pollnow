from .dto import PollResponse, PollOptionResponse
from .models import Poll


def map_poll_to_response(poll: Poll) -> PollResponse:
    return PollResponse(
        id=str(poll.id),
        title=poll.title,
        description=poll.description,
        options=[
            PollOptionResponse(
                id=str(option.id),
                text=option.text
            )
            for option in poll.options
        ]
    )
