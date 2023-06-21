FROM node

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN rm -r /home/app/node_modules
RUN npm install

EXPOSE 8080

CMD ["node", "/home/app/app.js"]