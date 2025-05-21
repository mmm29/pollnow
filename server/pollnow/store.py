from sqlmodel import create_engine, SQLModel, Session

engine = create_engine("sqlite:///./db.sqlite", echo=True)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
