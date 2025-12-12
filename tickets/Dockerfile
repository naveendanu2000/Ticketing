FROM node:alpine

WORKDIR /app
COPY package.json .
COPY . .
RUN npm install --omit=dev

CMD ["npm", "start"]



# FROM node:alpine
 
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
 
# CMD ["npm", "start"]