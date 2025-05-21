from contextlib import asynccontextmanager

from fastapi import FastAPI

from . import (
    auth,
    poll
)

from .store import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(auth.router)
app.include_router(poll.router)
