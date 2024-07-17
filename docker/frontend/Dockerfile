FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
# RUN npm run generate # don't generate in server mode, causes issue with nuxt/content

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]