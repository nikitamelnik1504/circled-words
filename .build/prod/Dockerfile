FROM node:16.15-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
ENV NODE_OPTIONS="--max-old-space-size=3096"
RUN npm i
COPY ./ ./
COPY .build/prod/.env.example .env
RUN npm run build
