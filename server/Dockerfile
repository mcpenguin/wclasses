FROM node:16

WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./

RUN npm install && npm install typescript --global
# npm ci --only=production for production

COPY . .

EXPOSE 8000

# build TS
RUN tsc
# run the app
CMD ["node", "dist/index.js"]
