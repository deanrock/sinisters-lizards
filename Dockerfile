# build stage
FROM node:lts-alpine as api-stage
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install
COPY api/. .

# build stage
FROM node:lts-alpine as client-stage
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/. .
RUN npm run build

# production stage
FROM api-stage as production-stage
COPY --from=client-stage /app/client/dist /dist
EXPOSE 3000
CMD node main.js
