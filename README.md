# KisanBazar - Working MVP

This is a fully working Minimum Viable Product (MVP) for the KisanBazar platform. 

## Features Included
1. **Authentication:** User Registration & Login (JWT, bcrypt).
2. **Role-Based Access:** 
   - Farmers can add and manage their produce.
   - Consumers can view the marketplace.
3. **Database:** MongoDB integration for users and products.
4. **State Management:** React Redux for Auth and Product state.
5. **Routing:** Protected routes for Farmer Dashboard.

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB running locally (or a MongoDB Atlas URI)

### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file and add:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/kisanbazar_mvp
   JWT_SECRET=supersecretjwtkey123
   ```
4. `npm run dev`

### 3. Frontend Setup
1. Open a new terminal and `cd frontend`
2. `npm install`
3. `npm start`

The frontend will run on `http://localhost:3000` and communicate with the backend on `http://localhost:5000`.
