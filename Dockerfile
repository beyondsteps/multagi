# 빌드 단계
FROM node:14 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# 실행 단계
FROM node:14-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 3000
CMD [ "node", "server.js" ]
