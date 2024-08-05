# Node.js 이미지를 기반으로 합니다.
FROM node:14

# 애플리케이션 디렉토리를 만듭니다.
WORKDIR /usr/src/app

# package.json과 package-lock.json 파일을 복사합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm install

# 애플리케이션 소스 코드를 복사합니다.
COPY . .

# 애플리케이션이 바인드할 포트를 지정합니다.
EXPOSE 3000

# 애플리케이션을 시작하는 명령어를 설정합니다.
CMD [ "node", "server.js" ]
