FROM node:19
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 
ENV PORT 3000
EXPOSE $PORT
CMD ["npm","run","dev"] 

