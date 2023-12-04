FROM node:18.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# prisma generate
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]


