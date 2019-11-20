FROM node:latest

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV DB_PORT=3306
ENV DB_NAME=lnkd_prod
ENV DB_HOST=35.202.139.249
ENV DB_USER=lnkd
ENV DB_PASS=9hF2ebbYESFfKtQp

WORKDIR /usr/src/app

RUN npm install strapi@beta -g --unsafe-perm
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]