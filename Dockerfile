FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

ln -s /mnt/data/ci_play/ ./data

EXPOSE 3002

id -u -n
id -u

CMD ["npm","start"]