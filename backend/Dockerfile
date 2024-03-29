FROM node:slim

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

ENV PORT=5000

ENV MONGO_URI = "mongodb://localhost:27017/task_manager"

ENV NODE_ENV = "development"

EXPOSE ${PORT}

CMD ["npm", "start"]