FROM node:12

RUN apt-get update && apt-get install -y bash

EXPOSE 7000
