# To build the image you have just to run "docker build -t front:v0.0.1" from the root of the project
# where "front" is the name of the image and "v0.0.1" is the tag of the image
FROM node:16.6.1-alpine3.11 as packager

# Define here a default value of the BASE_URL_CMS, you can override it later in the building
ARG BASE_URL_CMS="http://cms"
# Define here a default value of the BASE_URL_ES, you can override it later in the building
ARG BASE_URL_ES="http://es"

ENV BASE_URL_CMS ${BASE_URL_CMS}
# This variable needs to be replaced with apisearch
# and all this new comments are to test automatic build/deploy
ENV BASE_URL_ES ${BASE_URL_ES}

WORKDIR /app_front

COPY . /app_front
RUN npm install -g npm@7.18.1 --silent && \
    npm install  --legacy-peer-deps && \
    npm run build

FROM httpd:2.4.48-alpine3.14



COPY --from=packager /app_front/build /usr/local/apache2/htdocs/
COPY .docker/httpd.conf  conf/httpd.conf

EXPOSE 80
