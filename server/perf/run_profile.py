import json
import line_profiler
from fastapi.testclient import TestClient
from pollnow.main import app, init_db

init_db()

client = TestClient(app)

line_profiler.profile.show_config['output_unit'] = 1e-3

@line_profiler.profile
def main():
    with open('data.json', 'r') as f:
        data = json.load(f)

    # for account in data['accounts']:
    #     client.post('/register', json={
    #         'username': account['username'],
    #         'password': account['password']
    #     })

    for account in data['accounts']:
        client.post('/login', json={
            'username': account['username'],
            'password': account['password']
        })


if __name__ == "__main__":
    main()
