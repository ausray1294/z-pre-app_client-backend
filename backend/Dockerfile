FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install -g nodemon && \
    npm install

EXPOSE 8080

CMD ["npm", "run", "start:dev"]