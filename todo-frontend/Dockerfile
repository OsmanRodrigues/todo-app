# build environment
FROM node:12.19-alpine as build
WORKDIR /todo-frontend
ENV PATH /todo-frontend/node_modules/.bin:$PATH
COPY ["package.json", "yarn.lock", "./"]
ADD patches/react-scripts+4.0.3.patch ./
RUN yarn install
COPY . .
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /todo-frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]