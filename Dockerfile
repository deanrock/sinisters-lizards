FROM node:lts-alpine
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install

WORKDIR /app/api
COPY api/. .

WORKDIR /app/client
COPY client/. .

WORKDIR /app/api
EXPOSE 3000
CMD node app.js
