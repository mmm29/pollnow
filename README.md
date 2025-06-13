## About
Online Polling Web Application

## Installation

### Manual

* Install python 3.11, poetry.
* Clone the repo
    ```bash
    git clone https://github.com/mmm29/pollnow
    cd pollnow
    ```
* Run the API server
    ```bash
    cd server
    poetry install
    poetry run uvicorn pollnow.main:app --reload
    ```

The API server will be listening on port `8000`.

### Dev container

Run the devcontainer from `.devcontainer/devcontainer.json`.