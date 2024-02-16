FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

expose 4200

COPY . .

CMD ["ng", "build"]
