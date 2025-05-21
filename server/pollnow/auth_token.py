from typing import Optional

import jwt
import datetime

JWT_SECRET = '123456789'
JWT_ALGO = 'HS256'
EXPIRY_TIME = datetime.timedelta(days=30)


def create_auth_token(user_id: str) -> str:
    payload = {
        "user": user_id,
        "exp": datetime.datetime.now() + EXPIRY_TIME
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)
    return token


def check_auth_token(token: str) -> Optional[str]:
    """
    Returns User ID contained in the token if the token is valid and not expired.
    """

    try:
        data = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGO],
            options={"require": ["user", "exp"]}
        )

        return data['user']
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.InvalidTokenError as e:
        # Invalid token
        return None
