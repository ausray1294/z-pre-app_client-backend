# Inventory Application

> Something magical will happen if you click ---> <---- and `CTRL/CMND + SHIFT + V`

> Also did not manage to get the bugs worked out on User Story 5

## Know Bugs

### Fetches

- All of the fetches are there, it's just a matter of conditioning the data correctly (which I am very much still getting the hand of).
- For some reason some of my POST register twice, like Login is saying it happens twice

## Other Notes

- The UI is a hot mess, but I believe I have everything that is needed. I at least tried. Note sure If I spent to much time with CSS just for it to be meh.
- Functionality again is mostly there, but I really skimped from doing components and utils as this thing grew becasue I knew I would be spending so much time refactoring.
- I thought my Context was broke for the first 48 hours of working on this. It finally clicked that to setUser I needed to get the data based off the username. It finally clicked that I would only be getting a boolean/status back that had no data on it. Whomp
- **Honorable mentions**: Some random dudes on YouTube, an article from arunangshudas.medium, StackOverflow, and GitHub community examples for their dependencies.

## Description

The inventory application is a comprehinsive application that allows a visitor to the site to inspect items. This is also to that anyone has the ability to create an account and login. Users logged in will be able to manage their own inventories. The application uses Docker to compose microservices for the Database(PostgreSQL), Server(expressJS), and Client(ReactJS) that allow " seamless " CRUD intergration in the application.

## Features

- **General Inventory**: Allows users to view all inventories that are managed.
- **My Inventory**: Allows logged in users to navigate their inventory.
- **Account Details**: Users can veiw all of their account details
- **Secure Data Storage**: All user and inventory data are securely stored in a database managed by the Express server.

## Technology Stack

- **Frontend**:

  - React with Chakra UI for building user interfaces.
  - SweetAlert2 for alerts and notifications.
  - React Router for navigation.

- **Backend**:
  - Express.js for handling server-side logic and API requests.
  - Knex.js for query building and database migrations.
  - PostgreSQL as the database for storing user and chat data.
  - bcryptjs for hashing passwords.

## Installation

> Easiest way is actually a simple command in your terminal. `docker-compose up --build`.

1. **Clone the repository**:

```sh
git clone <repo-link>
cd z-pre-app_client-backend
```

2. Install dependencies for the server:

```sh
cd backend
npm install
```

3. Install dependencies for the client:

```sh
cd ../client
npm install
```

## Usage

1. Run the backend server:

```sh
cd api
npm start
```

2. Run the frontend client:

```sh
cd ../ui
npm start
```

3. Access the application:
   Open your browser and navigate to http://localhost:3000 or http://127.0.0.1:3000.

## Environment Variables

> On the server side of the house is where you can play with the environment configurations. Simply make a `.env` file and you're on your way to have a customizable database.

## Scripts

### Server:

- npm run start: Starts the server in development mode with hot reloading.

### Client:

- npm start: Starts the React development server.
- npm run build: Builds the React application for production.
- npm test: Runs tests.

## Database Migrations and Seeds

To set up the database, run the following commands from the api directory:

```sh
npx knex migrate:latest
npx knex seed:run
```

## User Stories

[x] 1. As an inventory manager I want to be able to create an account so that I can track my inventory.

[x] 2. As an inventory manager I want to be able to log into my account so that I can see my inventory of items.

- After logging in, the inventory manager should be redirected to their inventory of items.

[x] 3. As an inventory manager I want to be able to create a new item so that I can share my item details with the world.

- After the item is created, the inventory manager should be redirected to their inventory of items.
- An item displays name, description, and quantity.

[x] 4. As an inventory manager I want to be able to see a my entire inventory of items.

- The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.
  [x] As an inventory manager I want to be able to see any individual item I have added.
- The full item information should be displayed.

[] 5. As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.

- [ Post fail on .update ]When the user toggles edit mode, the page remains the same and the fields become editable.

[x] 6. As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.

- [Edit: Fix It \\Getting ""`3 or whatevernumber`"" instead of `insert id here`\\]When the user deletes the item they should be redirected to their inventory of items.

[x] 7. As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.

- Unauthenticated users should be able to view all items, and any single item.
- The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.

[x] 8. As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.

- Unauthenticated users should be able to view all items, and any single item.

[x] 9. As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.

- Unauthenticated users should be able to view all items, and any single item.
