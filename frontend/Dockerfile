FROM node:19-alpine

COPY . /app
WORKDIR /app

RUN npm install && \
    npm install -g serve && \
    npm run build

EXPOSE 3000

CMD [ "serve", "-l", "3000", "-s", "build" ]