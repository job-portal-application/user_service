FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm c
COPY . .

CMD ["npm", "run", "coverage"]