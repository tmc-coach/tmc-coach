# TMC-Coach Backend

## To run the application

### Container

```sh
docker build . -t backend
docker run -d -p 5000:5000 backend
```

### Without the container

```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python hello_world.py
```

## Analyzing the code with pylint

After activating the virtual environment and
installing all the requirements the code
can be analyzed with command

```sh
pylint hello_world.py
```

