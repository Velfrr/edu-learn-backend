FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY apps ./apps
COPY libs ./libs

RUN npm install

RUN npm run build

CMD ["node", "dist/apps/feedback/main.js"]
