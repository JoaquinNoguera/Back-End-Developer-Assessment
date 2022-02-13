FROM node:14.15-alpine

WORKDIR /home/node/app

EXPOSE 3000

COPY package.json package-lock.son ./
RUN npm install

COPY . .
USER node
RUN npm run build

CMD ["node", "dist"]
