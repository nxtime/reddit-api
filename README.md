# Backend API

This repository contains the backend API for a web application. The API is responsible for managing users, posts, comments, and followers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)

## Prerequisites

- Node.js (version 14.X.X)
- npm (version 6.X.X)

## Getting Started

1. Clone the repository:

git clone https://github.com/nxtime/ConverteMe.git

2. Install the dependencies:

cd ConverteMe
yarn | npm install

3. Set up the database:

   - Create a SQL database.
   - Update the database configuration in the `.env` file or if necessary in `src/database/connection.ts`.

4. Start the server:
   yarn dev | npm run dev

You can also run the project in production mode by running `yarn build` or `npm run build`.
After that you can start the server with `yarn start` or `npm start`.

The API should now be running by default at http://localhost:3000.

## API Documentation

The API provides the following endpoints:

- `POST /user/create`: Create a new user.
- `GET /user/all`: Get all users.
- `GET /user/:id`: Get a specific user by ID.
- `PATCH /user/:id`: Update a specific user by ID.
- `DELETE /user/:id`: Delete a specific user by ID.
- `POST /post/create`: Create a new post.
- `GET /post/all`: Get all posts.
- `GET /post/:id`: Get a specific post by ID.
- `PATCH /post/:id`: Update a specific post by ID.
- `DELETE /post/:id`: Delete a specific post by ID.
- `POST /comment/create`: Create a new comment.
- `GET /comment/all`: Get all comments.
- `GET /comment/:id`: Get a specific comment by ID.
- `PATCH /comment/:id`: Update a specific comment by ID.
- `DELETE /comment/:id`: Delete a specific comment by ID.
- `POST /follower/create`: Create a new follower relationship.
- `GET /follower/all`: Get all followers.
- `GET /follower/:id`: Get a specific follower by ID.
- `PATCH /follower/:id`: Update a specific follower by ID.
- `DELETE /follower/:id`: Delete a specific follower by ID.

For detailed information about the request and response formats of each endpoint, please refer to the API documentation.

## Technologies Used

- Node.js
- Express.js
- TypeORM
- Aurora MySql
