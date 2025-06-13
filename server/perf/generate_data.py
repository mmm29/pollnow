import random
import string
import json


def random_string(length):
    ALPHABET = string.ascii_letters + string.digits
    return ''.join(random.choice(ALPHABET) for _ in range(length))


def generate_account():
    return {
        'username': random_string(10),
        'password': random_string(10),
    }


def generate_poll():
    noptions = random.randint(2, 10)

    return {
        'title': random_string(20),
        'desc': random_string(20),
        'options': [
            random_string(10)
            for _ in range(noptions)
        ]
    }


N_ACCOUNTS = 100
N_POLLS = 1000

data = {
    'accounts': [
        generate_account()
        for _ in range(N_ACCOUNTS)
    ],
    'polls': [
        generate_poll()
        for _ in range(N_POLLS)
    ]
}

print(json.dumps(data))
