FROM node:12.19-alpine
WORKDIR /todo-backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${BACKEND_PORT}

CMD npm start
