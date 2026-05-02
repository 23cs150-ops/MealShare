# MealShare - Food Redistribution Platform

MealShare is a MERN-style web platform that reduces food waste by connecting restaurants with NGOs.
Restaurants post surplus food, NGOs request pickups, and the system tracks donation status from creation to collection or expiry.

## Overview

Large quantities of good food are discarded daily while many communities face food insecurity.
MealShare addresses this by enabling safe, trackable redistribution of surplus food with role-based access and approval flow.

## Key Features

### Restaurant Dashboard
- Create food donation posts
- View and manage posted food items
- Review incoming NGO requests
- Track donation metrics:
  - total posted
  - total requested
  - total collected
  - total expired

### NGO Dashboard
- Browse available food donations
- Request food pickups
- Track request and approval status

### System Features
- Role-based authentication (Restaurant / NGO)
- JWT-protected APIs
- Food expiry validation
- Pickup time window tracking
- Request approval workflow

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication

## Project Architecture

```text
MealShare/
|-- backend/
|   |-- server.js                  # Express app entry point
|   |-- config/
|   |   `-- db.js                  # MongoDB connection setup
|   |-- controllers/
|   |   |-- authController.js      # Register/login logic
|   |   |-- foodController.js      # Food CRUD and status logic
|   |   |-- requestController.js   # NGO request workflow
|   |   `-- statsController.js     # Dashboard analytics
|   |-- middleware/
|   |   `-- auth.js                # JWT verification and role checks
|   |-- models/
|   |   |-- User.js                # User schema (Restaurant/NGO)
|   |   |-- Food.js                # Food donation schema
|   |   `-- Request.js             # Request schema and lifecycle
|   `-- routes/
|       |-- authRoutes.js          # /api/auth
|       |-- foodRoutes.js          # /api/food
|       |-- requestRoutes.js       # /api/request
|       `-- statsRoutes.js         # /api/stats
|-- frontend/
|   |-- src/
|   |   |-- main.jsx               # App bootstrap
|   |   |-- App.jsx                # Route container
|   |   |-- index.css              # Global styles
|   |   |-- components/
|   |   |   |-- Navbar.jsx
|   |   |   `-- ProtectedRoute.jsx # Route guard by auth
|   |   |-- context/
|   |   |   `-- AuthContext.jsx    # Global auth state
|   |   |-- pages/
|   |   |   |-- LandingPage.jsx
|   |   |   |-- Login.jsx
|   |   |   |-- Register.jsx
|   |   |   |-- RestaurantDashboard.jsx
|   |   |   |-- NGODashboard.jsx
|   |   |   `-- MyRequests.jsx
|   |   `-- services/
|   |       |-- api.js             # Axios instance/base config
|   |       `-- auth.js            # Auth API helpers
|   |-- index.html
|   `-- vite.config.js
|-- screenshots/
|   |-- login.png
|   |-- restaurant.png
|   `-- ngo.png
`-- README.md
```

### Request-Response Flow

1. User authenticates via frontend pages.
2. Frontend sends credentials/token-based requests to backend APIs.
3. Backend middleware validates JWT and role permissions.
4. Controllers apply business logic and query MongoDB via models.
5. Frontend dashboards refresh with latest food, request, and stats data.

## API Modules

| Module | Base Endpoint | Purpose |
| --- | --- | --- |
| Auth | `/api/auth` | Register, login, identity handling |
| Food | `/api/food` | Food listing creation, updates, retrieval |
| Request | `/api/request` | NGO request creation and status transitions |
| Stats | `/api/stats` | Dashboard summaries and counts |

## Prerequisites

- Node.js 18+
- npm
- MongoDB (Atlas or local instance)

## Local Setup

1. Install dependencies:

```bash
npm install --prefix backend
npm install --prefix frontend
```

2. Configure environment variables in backend and frontend as needed.

3. Run development servers (two terminals):

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

4. Open:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Scripts

### Backend

```bash
npm run dev --prefix backend
npm start --prefix backend
```

### Frontend

```bash
npm run dev --prefix frontend
npm run build --prefix frontend
npm run preview --prefix frontend
```

## Food Lifecycle

1. Restaurant posts food
2. Food appears as available
3. NGO submits request
4. Restaurant approves/rejects
5. Approved request becomes collected after pickup
6. Unclaimed items pass to expired state

## Test Users

| Role | Email | Password |
| --- | --- | --- |
| Restaurant | test@restaurant.com | 123456 |
| NGO | NGO1@gmail.com | NGO1 |

## Screenshots

### Login Page
![Login Page](./screenshots/login.png)

### Restaurant Dashboard
![Restaurant Dashboard](./screenshots/restaurant.png)

### NGO Dashboard
![NGO Dashboard](./screenshots/ngo.png)

## Future Improvements

- Real-time notifications
- Mobile application
- GPS-enabled pickup tracking
- Advanced analytics dashboard

## Author

Sujal M R  
Computer Science Engineering Student
