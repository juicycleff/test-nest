FROM node:alpine

LABEL key="Rex Raphael"

RUN npm i -g typescript yarn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn

COPY . /usr/src/app

EXPOSE 3030 3031
CMD ["npm", "run", "start:prod"]