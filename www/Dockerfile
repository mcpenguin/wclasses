FROM node:16

WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install \
  && npm install typescript --global \
  && npm install next 
# npm ci --only=production for production

COPY . .
EXPOSE 3000

RUN npm run build
# run the app
CMD ["node", "server.js"]
