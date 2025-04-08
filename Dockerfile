# Base image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN chmod +x ./entrypoint.sh

# build only, no migrate yet
RUN npm run build

CMD ["./entrypoint.sh"]