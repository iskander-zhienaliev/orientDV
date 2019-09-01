FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /orient_app
WORKDIR /orient_app
ADD . /orient_app
RUN pip install -r requirements.txt
