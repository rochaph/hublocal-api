FROM node:lts-alpine as build

WORKDIR /app
COPY ["package.json", "package-lock.json*" , "tsconfig.json", "tsconfig.build.json", "./"]
COPY .env.production .env
RUN npm install
COPY src ./src
RUN npm run build

FROM build as final
ENV NODE_ENV=production
WORKDIR /app

RUN apk add --no-cache bash
COPY --from=build --chown=node /app/dist ./
COPY ./scripts/init.sh init.sh
RUN npm prune --production
RUN chmod 750 init.sh ./node_modules

EXPOSE 3001
CMD ["/bin/bash", "init.sh"]

