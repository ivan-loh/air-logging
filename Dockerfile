FROM node:8

ENV TZ=Asia/Kuala_Lumpur
RUN ls -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


WORKDIR /app
ADD . .
RUN rm -rf node_modules/
RUN npm install
RUN npm uninstall -g npm


CMD [ "node", "app.js" ]
