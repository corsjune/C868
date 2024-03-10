FROM node:lts-alpine

# Install aurelia-cli to build the app & http-server to serve static contents
RUN npm i -g http-server
RUN npm i -g aurelia-cli

# Set the working directory to the app folder
WORKDIR /app

# Copy package.json and related files first, then install all required dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files and folders & install dependencies
COPY . ./
RUN npm run build

# By default, http-server will serve contents on port 8080
# Expose this port to the host machine
EXPOSE 8080

# Start the http-server to serve the built app from the 'dist' folder
CMD ["http-server", "wwwroot/dist"]