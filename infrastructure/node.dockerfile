FROM node:14

WORKDIR /var/www

RUN npm install -g pm2 nodemon typeorm node-pre-gyp
RUN npm install

WORKDIR /var/www/app

EXPOSE 3000
CMD [ "nodemon", "-L", "-V", "app/server.js" ]
