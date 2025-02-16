FROM node:22

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run generate-words

EXPOSE 8080
CMD ["npm", "start"]
