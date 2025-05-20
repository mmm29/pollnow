from contextlib import contextmanager
from sqlmodel import create_engine, SQLModel, Session

engine = create_engine("sqlite:///./db.sqlite", echo=True)
SQLModel.metadata.create_all(engine)


def get_session():
    try:
        yield Session(engine)
    finally:
        pass


get_db = contextmanager(get_session)
