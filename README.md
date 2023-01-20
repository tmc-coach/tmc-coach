# TMC-Coach

Purpose of the application is to coach students with courses that use [TMC](https://tmc.mooc.fi/). Users of the application create a target schedule for a course, and if she/he falls behind the target schedule, a friendly reminder is sent to the user.

TMC-Coach is a project for Ohjelmistotuotantoprojekti course in University of Helsinki.

## Run the project

### From the root folder

```sh
docker compose up --build
```

### From frontend-folder

```sh
docker build -t coach/front .
docker run -p 3000:3000 coach/front
```
or

```sh
npm install
npm start
```

### From the backend-folder

```sh
docker build -t coach/back .
docker run -p 5000:5000 coach/back
```
or

```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python hello_world.py
```
