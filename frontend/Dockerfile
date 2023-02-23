FROM node:19-alpine
COPY . /app
WORKDIR /app

RUN npm install --production

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]