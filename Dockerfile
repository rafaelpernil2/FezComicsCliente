FROM node:11
WORKDIR /FezComicCliente-Service
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8100
CMD ["npm", "start"]
