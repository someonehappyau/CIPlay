FROM node:boron

RUN id -u -n
RUN id -u

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN ln -s /mnt/data/ci_play/ ./data

EXPOSE 3002

CMD ["npm","start"]