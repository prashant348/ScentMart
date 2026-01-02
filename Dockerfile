#1 Base image (Node)
FROM node:20-alpine

#2 Add directory inside container
WORKDIR /app

#3 Package files copy
COPY package*.json ./

#4 Install dependencies
RUN npm install 

#5 Copy all files
COPY . .

#6 NextJS build command
RUN npm run build

#7 Expose port
EXPOSE 3000

#8 Production server start
CMD [ "npm", "run", "start" ]