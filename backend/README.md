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
