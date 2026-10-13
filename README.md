# Creator AI Marketplace

The application stores marketplace projects in MongoDB.

## Run locally

1. Install dependencies from this directory with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string. `MONGODB_DB` is optional and defaults to `creator_ai`.
3. Start the application with `npm start`.
4. Open `http://localhost:5000`.

The server starts even if MongoDB is not running and retries the connection.
Static pages remain available, while project API requests return `503` until
MongoDB is reachable. The MongoDB user must be allowed to read and write the
configured database.

## Pages

- `/` or `/index.html` — home, creator matching, brand brief, and projects.
- `/creator.html` — searchable creator directory.
- `/project.html` — creator search, category filters, and project hiring.
- `/Budget.html` — campaign budget calculator.
- `/login.html` — login demo.

Use the navigation links to move between pages; all pages are served from the
same local application.

## Project API

- `GET /api/projects` lists saved projects.
- `POST /api/projects` creates a project using `title`, `creator`, and `budget`.
- `PATCH /api/projects/:id` updates a project's status.

Projects are stored in the `projects` collection with their status and creation
and update timestamps.
