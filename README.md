# Express Test Project

This repository contains a simple project to test and explore the features of the Express.js framework, along with SQLite. It serves as a learning and experimentation space for building web applications using Node.js, Express and SQLite.

The Express Test Project is a web application that allows users to register, log in, and manage a list of products. It includes user authentication and session management, as well as basic CRUD (Create, Read, Update, Delete) operations for product management. The project is structured to demonstrate the use of Express.js with SQLite, and is intended for educational and testing purposes.

## Features

- User registration and login
- Product management (add, view, update, delete)
- User authentication and session management
- Basic Express.js setup
- Routing examples
- Middleware usage
- Error handling
- Static file serving
- Sample API endpoints

## Folder Structure

```
expressTest/
├── routes/         # Application routes
├── middleware/     # Custom middleware
├── public/         # Static files (HTML, CSS, JS)
├── views/          # Template files (if applicable)
├── database/       # SQLite DB connection and setup
├── app.js          # Main application file
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## Usage

- Visit `/signup` to create a new user account.
- Visit `/login` to log in with your credentials.
- After logging in, you can view, add, update, or delete products on the home page (`/`).
- Visit `/users` to get a JSON list of all users (for testing/demo purposes).
- Use the logout button or visit `/logout` to end your session.

## Authentication

- User authentication is managed using `express-session`.
- Only authenticated users can access the main product page (`/`).
- Sessions are created on successful login and destroyed on logout.

## API Endpoints

### Product Endpoints
- `GET /products` — Get all products (JSON)
- `POST /products` — Add a new product (form or JSON)
- `PUT /products/:id` — Update a product (form or JSON, uses method-override)
- `DELETE /products/:id` — Delete a product (form, uses method-override)

### User Endpoints
- `GET /users` — Get all users (JSON)
- `POST /users/signup` — Create a new user (JSON)
- `GET /users/login` — Login (JSON, or via `/login` form)

## Middleware
- `method-override` is used to support PUT and DELETE methods from forms.
- `express-session` is used for session management.

## Notes
- The project uses EJS for server-side rendering of views.
- Static files (CSS) are served from the `public/` directory.
- The SQLite database is stored in `database/products.db` and is auto-created if missing.

