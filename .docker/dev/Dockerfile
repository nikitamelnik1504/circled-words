FROM node:16.15-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY ./ ./
EXPOSE 3000 3001
CMD ["npm", "run", "dev"]