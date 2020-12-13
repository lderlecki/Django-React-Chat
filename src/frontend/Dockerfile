FROM node:alpine AS builder
RUN apk add --no-cache git
ENV PATH /node_modules/.pin:$PATH
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./
CMD ["npm", "run", "dev"]
