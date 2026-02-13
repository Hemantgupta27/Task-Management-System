# Task Management System API

## Live Deployment

* **Backend (Render):**
  https://task-management-system-hhzg.onrender.com

* **Postman API Documentation:**
  https://documenter.getpostman.com/view/35110395/2sBXcBn2PF

---

## Overview

This project is a **Task Management Backend API** built using **Node.js, Express, and MySQL**.
It supports user authentication, OTP-based login simulation, JWT authorization, and task management with pagination.

---

## Features

* User Registration
* OTP Login Simulation
* JWT Authentication
* Create, Read, Update, Delete Tasks (CRUD)
* Pagination for task listing
* Input Validation
* Activity Logging
* Rate Limiting
* API Documentation using Postman

---

## Technologies Used

* Node.js
* Express.js
* MySQL
* JWT (jsonwebtoken)
* bcryptjs
* express-validator
* express-rate-limit
* dotenv

---

## Project Structure

```
config/
controllers/
middleware/
routes/
utils/
app.js
package.json
README.md
```

---

## How to Run the Project Locally

### 1. Clone the Repository

```
git clone https://github.com/Hemantgupta27/Task-Management-System.git
cd Task-Management-System
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Create Database in MySQL

Run this SQL:

```sql
CREATE DATABASE taskdb;
USE taskdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  otp VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
JWT_SECRET=your_secret_key

DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=taskdb
```

---

### 5. Start the Server

```
npm start
```

Server will run at:

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/send-otp`
* POST `/api/auth/verify-otp`

### Tasks

* POST `/api/tasks`
* GET `/api/tasks?page=1`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

---

## Testing APIs

You can test APIs using:

* Postman
* Thunder Client
* Swagger or API Documentation link provided above

---

## Author

Hemant Gupta
