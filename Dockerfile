
# Stage 1: Building artifact
FROM node:12.18.3-alpine3.9 as build
WORKDIR /app
COPY . .
#COPY package.json package-lock.json ./
RUN npm install -g @angular/cli@8.3.8 --omit=dev
RUN npm install --force
RUN npm run  build --prod
# # Stage 2: Running artifact
FROM ubuntu:18.04
RUN apt update -y \
    && apt install nginx -y \
    && apt-get install software-properties-common -y \
    && add-apt-repository ppa:certbot/certbot -y \
    && apt-get update -y \
    && apt-get install python-certbot-nginx -y \
    && apt-get clean \
EXPOSE 80
COPY --from=build /app/dist/angular-starter /var/www/html
#COPY ./dist/angular-starter/ /var/www/html
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
