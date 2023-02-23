FROM python:3.11

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

ENV FLASK_APP=hello_world
ENV FLASK_DEBUG=production

EXPOSE 5000

RUN flask db init
RUN flask db migrate -m "Initial migration"

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
