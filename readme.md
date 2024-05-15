# Members Only - Odin Project Full Stack with JavaScript Curriculum Node.js Section Project

## Description

Members Only is an exclusive clubhouse where your members can write anonymous posts. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

## Features

- **Membership Activation**: Users signing up are not automatically given membership status. They must join the club by entering a secret passcode. If they enter the passcode correctly, their membership status is updated.

- **Anonymous Posts**: Members can write anonymous posts, which are displayed on the home page. Non-members can only see the story and wonder who wrote it.

- **Privacy for Members**: Only club-members can see the author and date of the messages on the home page. Non-members do not have access to this information.

- **Admin Privileges**: Admin users have the ability to delete or edit any posts on the platform.

## Installation

To install the necessary dependencies, use npm (Node Package Manager). Make sure you have Node.js installed on your machine.

Run the following command in your terminal:

```bash
npm install
```
This will install all the dependencies listed in the package.json file, including both production and development dependencies.

## Dependencies
- bcryptjs
- connect-flash
- dotenv
- ejs
- express
- express-async-handler
- express-ejs-extend
- express-session
- express-validator
- mongoose
- passport
- passport-local
- path

## Development Dependencies
- nodemon

## Environment Variables

Before running the application, make sure to set the following environment variables:

- MONGODB_URI: Connection URL to MongoDB database.
- SECRET_KEY: Session secret.
- PASSCODE: Passcode to join the club after authenticating.
- These environment variables are necessary for configuring the application.

## Usage
To start the application, run the following command:

```bash
npm start
```

This will start the application with app.js as the main file.

Alternatively, you can run the application in development mode using nodemon:

```bash
npm run dev
```

## Author

- Ashif Thekkupuram

## License

This project is licensed under the ISC License.