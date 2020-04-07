FROM node:12.16.1-alpine

ENV DEBUG=*

WORKDIR /srv/node

COPY ./build /srv/node/build
COPY ./package.json /srv/node/package.json
COPY ./package-lock.json /srv/node/package-lock.json
COPY ./node_modules /srv/node/node_modules

RUN apk --update add --no-cache git && apk del git

CMD npm start
