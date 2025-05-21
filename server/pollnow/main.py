from fastapi import FastAPI

from . import (
    auth,
    poll
)

app = FastAPI()
app.include_router(auth.router)
app.include_router(poll.router)
