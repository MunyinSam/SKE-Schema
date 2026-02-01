FROM node:22-alpine

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8000

HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD wget -qO- http://localhost:8000/health || exit 1

CMD [ "npm", "start" ]