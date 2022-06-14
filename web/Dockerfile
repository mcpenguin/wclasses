FROM node:16

WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./ 

RUN npm install \
&& npm install typescript --global \
&& npm install react-scripts --global

COPY . .

CMD ["npm", "start"]
