FROM python:3.11

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

ENV FLASK_APP=tmc-coach
ENV FLASK_DEBUG=1
ENV PYTHONPATH=/app

EXPOSE 5000


CMD ["gunicorn", "--bind", "0.0.0.0:5000", "tmc-coach:create_app()"]
