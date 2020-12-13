FROM python:alpine
RUN apk --update add --no-cache gcc libc-dev postgresql-dev
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
