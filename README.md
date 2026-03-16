Food Redistribution Platform (MERN Stack)
Overview

The Food Redistribution Platform is a web application that helps reduce food waste by connecting restaurants with NGOs. Restaurants can post surplus food, and NGOs can request and collect the food for distribution to people in need.

The system manages the complete lifecycle of food donations, including pickup time windows, expiry validation, and request approval.

Problem Statement

Large amounts of food are wasted every day by restaurants and events, while many people struggle with hunger. This platform helps bridge that gap by providing a simple digital system where surplus food can be redistributed efficiently and safely.

Features
Restaurant Dashboard

Add food donations

View posted food items

Track request status

View statistics:

Total Food Posted

Total Food Collected

Total Requested

Total Expired

NGO Dashboard

View available food donations

Request food for collection

Track request status

System Features

Role-based authentication (Restaurant / NGO)

Food expiry validation

Pickup time window management

Request approval workflow

Automatic expiry handling

Tech Stack

Frontend:

React.js

Backend:

Node.js

Express.js

Database:

MongoDB Atlas

Authentication:

JWT (JSON Web Token)

System Architecture

Frontend → React.js
Backend → Node.js + Express.js
Database → MongoDB Atlas

The frontend communicates with the backend using REST APIs, and the backend manages data storage and authentication.

Database Schema
User

name

email

password

role (restaurant / ngo)

Food

title

quantity

pickupStartTime

pickupEndTime

expiryTime

location

status

restaurantId

Request

foodId

ngoId

status (pending / approved)

Food Lifecycle

Restaurant posts food donation

Food becomes available

NGO requests the food

Restaurant approves the request

Food status changes to collected

If expiry time passes, status becomes expired

How to Run the Project
1. Clone Repository

git clone https://github.com/yourusername/food-redistribution-platform.git

2. Install Dependencies

Backend:

cd backend
npm install

Frontend:

cd frontend
npm install

3. Setup Environment Variables

Create a .env file in the backend folder.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run Backend

cd backend
npm run dev

5. Run Frontend

cd frontend
npm run dev

Open the application in your browser:

http://localhost:5173

Future Improvements

Real-time notifications

Mobile application

GPS-based pickup tracking

Food quality verification

Analytics dashboard

Author

Sujal M R
Computer Science Engineering Student
