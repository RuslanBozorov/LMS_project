FROM node:20-alpine

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./

ENV NODE_ENV=development
RUN npm install --include=dev

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD [ "sh", "-c", "npx prisma migrate deploy && npm run prisma:seed && npm run start:prod" ]
