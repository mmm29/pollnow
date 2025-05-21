from fastapi import HTTPException


class ResourceNotFound(HTTPException):
    def __init__(self, text='Resource not found'):
        super().__init__(404, text)


class AuthFailed(ResourceNotFound):
    def __init__(self):
        super().__init__('No user with these credentials could be found')


class NotAutenticated(HTTPException):
    def __init__(self):
        super().__init__(status_code=403, detail="Not authenticated")


class AlreadyExists(HTTPException):
    def __init__(self):
        super().__init__(status_code=409, detail="Already exists")
