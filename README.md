Basic Activity Booking API

A simple RESTful API backend for a Basic Activity Booking App (similar to MeetX), built with Node.js, Express, MongoDB, and JWT authentication.

Features

User Registration & Login with JWT-based authentication

List Activities (public endpoint) with pagination and sorting

Book an Activity (authenticated users only)

Get My Bookings for the logged-in user

Password hashing with bcrypt

Input validation with express-validator

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT (jsonwebtoken)

Validation: express-validator

Prerequisites

Node.js v14 or above

npm or Yarn

MongoDB Atlas cluster or local MongoDB instance

Installation

Clone the repository

git clone https://github.com/Santhiyakn/Activity-Booking
cd activity-booking-api

Install dependencies

npm install
# or
yarn install

Configure environment variables
Create a .env file in the root directory with the following:

PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Activities-DataBase?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here

Running the App

npm start
# or for development with auto-reload
npm run dev

The server will start on http://localhost:${process.env.PORT || 8000}

API Endpoints

All routes are prefixed with /api.

1. User Authentication

Register: POST /api/auth/register

Body: { name, email, phone, password }

Response: Success message

Login: POST /api/auth/login

Body: { email, password }

Response: { token } (JWT)

2. Activities

List Activities: GET /api/activities/get

req Body:

pageNumber (number, default: 1)

pageSize (number, default: 10)

sortBy (string, e.g. date,, default:'title')

sortOrder (asc ->1 or desc ->-1, default:desc)

Get Single Activity: GET /api/activities?id=<activityId>

Query param: id

Response: Single activity object

3. Booking

Book an Activity: POST /api/activity/book

Headers: Authorization: Bearer <token>

Body: { activityId }

Response: Booking confirmation

Get My Bookings: GET /api/activity/mybookings

Headers: Authorization: Bearer <token>

Response: List of bookings for the authenticated user


Contributing

Fork the repository

Create your feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m 'Add some feature'

Push to the branch: git push origin feature/YourFeature

Open a Pull Request