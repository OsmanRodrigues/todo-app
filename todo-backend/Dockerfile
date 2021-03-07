FROM node:alpine
WORKDIR /todo-backend/api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${BACKEND_PORT}

CMD npm start
