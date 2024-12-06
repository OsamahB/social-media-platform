## Pre Requirements
### Run in production mode
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) are required to run the project in production mode.
- [Mailtrap](https://mailtrap.io/) account is required to send the email notifications.

### Run in development mode
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) are required to run the project in development mode.
- [mailtrap](https://mailtrap.io/) account is required to send the email notifications.
- [PostgreSQL](https://www.postgresql.org/) is required as the database.
- [Zookeeper](https://zookeeper.apache.org/) and [Kafka](https://kafka.apache.org/) are required for communication between services.

## Installation
### Run in production mode
1. Clone the repository
```bash
$ git clone https://github.com/OsamahB/social-media-platform.git
```
2. Change the directory
```bash
$ cd social-media-platform
```
3. Create a .env file in the root directory by copying the .env.example file and updating the values
```bash
$ cp .env.example .env
```
4. Build the docker images
```bash
$ docker-compose build
```
5. Run the docker containers
```bash
$ docker-compose up
```

### Run in development mode
The project is divided into multiple services. Each service has its own package.json file. To run the project in development mode, follow the steps below:

1. Clone the repository
```bash
$ git clone https://github.com/OsamahB/social-media-platform.git
```
2. Change the directory
```bash
$ cd social-media-platform
```
3. Create a .env file in the root directory by copying the .env.example file and updating the values
```bash
$ cp .env.example .env
```
4. Install `nest` globally
```bash
$ npm install -g @nestjs/cli
```
5. Change the directory to the service you want to run (e.g., email-notification-ms)
```bash
$ cd email-notification-ms
```
6. Install the dependencies
```bash
$ npm install
```
7. Start the services
```bash
$ npm run start:dev
```
8. Enjoy! 😃🎉

## Services
The project is divided into multiple services. Each service has its own package.json file. The services are:
1. **User Event Microservice:** This service is responsible for handling the user and event posts related operations.
2. **Email Notification Microservice:** This service is responsible for sending email notifications to the users.

## API Documentation
The API documentation is available at `http://localhost:3000/api`. The documentation is generated using Swagger.
