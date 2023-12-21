FROM node:18

RUN npm install -g @angular/cli@17.0.7

WORKDIR /var/www

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000
