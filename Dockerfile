#1: build web assets && codes fom  node images
FROM node:26-alpine AS asstes
WORKDIR /app

#install dependess
COPY package.json ./
RUN npm ci

#copy all sources files & build
COPY . .
RUN npm run build