from typing import Optional

import passlib.hash
from pydantic import BaseModel
from sqlmodel import select
import sqlalchemy
import passlib

from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .models import User
from .auth_token import create_auth_token, check_auth_token
from .errors import NotAutenticated, AuthFailed, AlreadyExists, ValidationError
from .store import get_session, Session


class UserResponse(BaseModel):
    username: str


class AuthResponse(BaseModel):
    token: str


class UserCredentials(BaseModel):
    username: str
    password: str


router = APIRouter()
bearer_security = HTTPBearer()


def hash_password(password: str) -> str:
    return passlib.hash.bcrypt.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return passlib.hash.bcrypt.verify(password, password_hash)


async def get_session_user(session: Session = Depends(get_session), creds: HTTPAuthorizationCredentials = Depends(bearer_security)) -> Optional[User]:
    token = None
    if creds is not None:
        token = creds.credentials

    user_id = check_auth_token(token)
    if user_id is None:
        return None

    user = await get_user_by_user_id(session, user_id)
    if user is None:
        return None

    return user


async def require_user(session: Session = Depends(get_session), creds: HTTPAuthorizationCredentials = Depends(bearer_security)) -> User:
    user = await get_session_user(session, creds)
    if user is None:
        raise NotAutenticated()

    return user


async def get_user_by_user_id(session: Session, user_id: str) -> Optional[User]:
    return session.exec(select(User).where(User.id == int(user_id))).one_or_none()


@router.get('/me', response_model=UserResponse)
async def get_me(user=Depends(require_user)):
    return UserResponse(
        username=user.username
    )


@router.post('/login', response_model=AuthResponse)
async def login(credentials: UserCredentials, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(User.username == credentials.username)).one_or_none()

    if user is None:
        raise AuthFailed()

    password_hash = user.password
    if not verify_password(credentials.password, password_hash):
        raise AuthFailed()

    token = create_auth_token(user.id)
    return AuthResponse(token=token)


@router.post('/register', response_model=AuthResponse)
async def login(credentials: UserCredentials, session: Session = Depends(get_session)):
    password_hash = hash_password(credentials.password)
    user = User(username=credentials.username,
                password=password_hash)

    session.add(user)

    try:
        session.commit()
    except sqlalchemy.exc.IntegrityError:
        raise AlreadyExists()

    session.refresh(user)

    token = create_auth_token(user.id)
    return AuthResponse(token=token)


class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str


@router.put('/password')
async def change_password(request: ChangePasswordRequest, session: Session = Depends(get_session), user: User = Depends(require_user)):
    if not request.old_password:
        raise ValidationError('no old password')

    if not request.new_password:
        raise ValidationError('no new password')

    if not verify_password(request.old_password, user.password):
        raise ValidationError('incorrect old password')

    user.password = hash_password(request.new_password)
    session.commit()


@router.post('/logout')
async def logout():
    return
