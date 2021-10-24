FROM node:14-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . /app
EXPOSE 3000
CMD [ "npm", "start" ]