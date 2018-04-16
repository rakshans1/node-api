FROM node:alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm install --only=production
RUN npm install pm2@latest -g

COPY . .

CMD npm start