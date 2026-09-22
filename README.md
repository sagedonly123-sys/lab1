# Software Project I - Practice Assignment 1

## Filter and Search Todos

This repository contains my completed solution for Practice Assignment 1. The application is a full-stack todo list built with Node.js, Express, MongoDB, React, and Axios.

## Completed Work

### Backend

- Updated `getTodos` in `backend/controllers/todoController.js`.
- Read the optional `done` value from `req.query`.
- Built a conditional MongoDB filter object.
- Added support for:
  - `GET /api/todos` - returns all todos.
  - `GET /api/todos?done=true` - returns completed todos.
  - `GET /api/todos?done=false` - returns active todos.
- Preserved the original sorting by newest todo first.

### Frontend

- Updated `fetchTodos` to accept an optional `done` filter and send it as an Axios query parameter.
- Added React state for the current filter: `all`, `active`, or `done`.
- Updated `useEffect` so todos are fetched again whenever the filter changes.
- Added All, Active, and Done filter buttons.
- Kept the displayed list consistent after adding, completing, renaming, or deleting a todo.
- Corrected component import capitalization so the project builds successfully on case-sensitive systems.

## Verification

- Confirmed the backend creates the correct filter for no query, `done=true`, and `done=false`.
- Passed the frontend ESLint check.
- Passed the frontend production build.
- Passed Node.js syntax validation for the backend files.

## Run the Project

### Backend

```bash
cd backend
npm install
node server.js
```

The backend runs at `http://localhost:3000` and requires MongoDB at `mongodb://127.0.0.1:27017/tododb`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```
