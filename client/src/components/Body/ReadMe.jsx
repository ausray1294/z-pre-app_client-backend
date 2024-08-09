import { Box, Textarea, CardBody, CardHeader, Card } from '@chakra-ui/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdownReadMe =
  "# Inventory Application\n ## Description\n The inventory application is a comprehensive application that allows a visitor to the site to inspect items. This is also so that anyone has the ability to create an account and login.\n Users logged in will be able to manage their own inventories. The application uses Docker to compose microservices for the Database (PostgreSQL), Server (expressJS), and\n Client (ReactJS) that allow seamless CRUD integration in the application.\n ## Features\n - **General Inventory**: Allows users to view all inventories that are managed.\n - **My Inventory**: Allows logged in users to navigate their inventory.\n - **Account Details**: Users can view all of their account details\n - **Secure Data Storage**: All user and inventory data are securely stored in a database managed by the Express server.\n ## Technology Stack\n - **Frontend**:\n - React with Chakra UI for building user interfaces.\n - SweetAlert2 for alerts and notifications.\n - React Router for navigation.\n - **Backend**:\n - Express.js for handling server-side logic and API requests.\n - Knex.js for query building and database migrations.\n - PostgreSQL as the database for storing user and chat data.\n - bcryptjs for hashing passwords.\n ## Installation\n The easiest way is actually a simple command in your terminal: `docker-compose up --build`.\n 1. **Clone the repository**:\n ```sh\n git clone `repo-link`\n cd z-pre-app_client-backend\n ```\n 2. Install dependencies for the server:\n ```sh\n cd backend\n npm install\n ```\n 3. Install dependencies for the client:\n ```sh\n cd ../client\n npm install\n ```\n ## Usage\n 1. Run the backend server:\n ```sh\n cd api\n npm start\n ```\n 2. Run the frontend client:\n ```sh\n cd ../ui\n npm start\n ```\n 3. Access the application:\n Open your browser and navigate to http://localhost:3000 or http://127.0.0.1:3000.\n ## Environment Variables\n On the server side, you can play with the environment configurations. Simply make a `.env` file and you're on your way to having a customizable database.\n ## Scripts\n ### Server:\n - npm run start: Starts the server in development mode with hot reloading.\n ### Client:\n - npm start: Starts the React development server.\n - npm run build: Builds the React application for production.\n - npm test: Runs tests.\n ## Database Migrations and Seeds\n To set up the database, run the following commands from the api directory:\n ```sh\n npx knex migrate:latest\n npx knex seed:run\n ```";

const ReadMe = () => {
  return (
    <Box>
      <Card>
        <CardHeader>
          The Very Bad Read Me
          <Textarea>
            Please look at the actual README in the root directory
          </Textarea>
        </CardHeader>
        <CardBody>
          <ReactMarkdown m={40}>{markdownReadMe}</ReactMarkdown>
        </CardBody>
      </Card>
    </Box>
  );
};

export { ReadMe };
export default ReadMe;
