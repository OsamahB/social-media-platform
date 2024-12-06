# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm i -g @nestjs/cli
RUN npm run build

# Expose the application port
ARG USER_EVENT_PORT=3000
EXPOSE $USER_EVENT_PORT

# Command to run the application
CMD ["node", "dist/main"]