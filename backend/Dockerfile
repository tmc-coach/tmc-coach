FROM python:3.11

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

ENV FLASK_DEBUG=1

EXPOSE 5000


CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:create_app()"]
