FROM node:alpine
RUN npm install -g http-server
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]