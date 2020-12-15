FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code

#RUN apt-get update && \
#    apt-get install -y \
#    bash \
#    build-essential \
#    gcc \
#    libffi-dev \
#    musl-dev \
#    openssl \
#    postgresql \
#    libpq-dev

COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
