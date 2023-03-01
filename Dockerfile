FROM node:16

WORKDIR /usr/src/app/news-feed-app

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
