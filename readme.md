# MERN App with TDD Approach

This is a MERN (MongoDB, Express.js, React.js, Node.js) app developed using a Test-Driven Development (TDD) approach. The app is also Dockerized using Docker Compose.

## Getting Started

To run the app, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Make sure you have Docker and Docker Compose installed on your machine.
4. Open a terminal and run the following command:

   ```bash
   docker-compose up -d
   ```

   This command will build and start the Docker containers for the app.

5. Once the containers are up and running, you can access the app by opening your web browser and navigating to `http://localhost:80`.

## Testing

To run the tests for the app, you can use the following command:

    docker-compose exec server npm test

This command will run the tests for the server-side code. You can also run the tests for the client-side code by using the following command:

    docker-compose exec client npm test
