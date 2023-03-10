FROM python:3.11-alpine

COPY . /tmc-coach
WORKDIR /tmc-coach

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Europe/Helsinki /etc/localtime && \
    echo "Europe/Helsinki" > /etc/timezone && \
    pip install -r requirements.txt

ENV FLASK_APP=tmc_coach.py
# ENV FLASK_DEBUG=1

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "tmc_coach:create_app()"]
