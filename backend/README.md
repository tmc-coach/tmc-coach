# TMC-Coach Backend

## To run the application

### Container

Setup the database and network with

```sh
docker pull postgres:alpine
docker network create my-network
docker run -d --name postgres-db \
           -e POSTGRES_USER=<username> \
           -e POSTGRES_PASSWORD=<password> \
           -e POSTGRES_DB=<database_name> \
           --network my-network \
           -v postgres-db-data:/var/lib/postgresql/data \
           -p 5432:5432 \
           postgres:alpine
```

Then build and run the container with

```sh
docker build . -t backend
docker run -d --name backend \
           --network my-network \
           -p 5000:5000 \
           backend
```

Enter the container to intialize the database with

```sh
docker exec -it backend bash
python -m flask db init
python -m flask db migrate -m "Initial migration"
python -m flask db upgrade
```

After changing the database models, the database can be updated with

```sh
docker exec -it backend bash
python -m flask db migrate -m "Optional message"
python -m flask db upgrade
```

Database can be accessed manually with

```sh
docker exec -it postgres-db bash
psql -U <username> -d <database_name>
```

### Without the container

Setup the virtual environment and install the requirements with

```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Setup your local postgresql-server and create a database for the application. Then set the environment variables `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB` to match the database credentials. Initialize the database tables with

```sh
export FLASK_APP=tmc_coach.py
python -m flask db init
python -m flask db migrate -m "Initial migration"
python -m flask db upgrade
```

After changing the database models, the database can be updated with

```sh
export FLASK_APP=tmc_coach.py
python -m flask db migrate -m "Optional message"
python -m flask db upgrade
```

Run the application with

```sh
python tmc_coach.py
```

## Analyzing the code with pylint

After activating the virtual environment and installing all the requirements the code can be analyzed with command

```sh
pylint tmc_coach.py
```

## Type checking with Mypy

After activating the virtual environment and installing all the requirements the code can be type checked with

```sh
mypy tmc_coach.py
```

## Format code with Black

After activating the virtual environment and installing all the requirements the code can be formatted usin Black with

```sh
black .
```

## Testing

Testing the backend is possible with

```sh
pytest .
# or
pytest -v .     # With information about tests
pytest -v -v .  # With more information about tests
```
