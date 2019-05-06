FROM node:11
WORKDIR /FezComicCliente-Service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8100
CMD ["npm", "start"]
