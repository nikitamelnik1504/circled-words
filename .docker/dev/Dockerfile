FROM node:16.15-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY ./ ./
EXPOSE 80
CMD ["npm", "run", "dev"]