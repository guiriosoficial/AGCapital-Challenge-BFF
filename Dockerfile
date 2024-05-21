FROM node:lts-alpine
RUN mkdir "/app"
WORKDIR "/app"
RUN npm install -g typescript
RUN npm install -g ts-node
ADD src /app/src
ADD package.json /app
ADD yarn.lock /app
ADD package-lock.json /app
ADD tsconfig.json /app
RUN yarn install
RUN yarn run build
EXPOSE 3001
CMD ["yarn", "run", "startprod"]