FROM node:12.14.1-alpine3.11

RUN mkdir /premierLeagueReplicaApp

ADD . /premierLeagueReplicaApp

WORKDIR /premierLeagueReplicaApp

RUN npm install

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]