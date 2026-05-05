# 📚 Online Library Platform

A full-stack web application developed for the *Data Transmission* course, designed to manage books, users, and interactions in a digital library environment.

---

## 🚀 Features

* 🔐 User authentication (Register & Login)
* 📖 Book management (CRUD operations)
* 💬 Comments system
* ⚡ Real-time updates (WebSocket)
* 🖼️ Image support for books
* 🌐 Multiple pages (tabs/navigation)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose
* JWT Authentication
* bcrypt (password hashing)

### Frontend *(to be implemented)*

* React
* Tailwind CSS

### Testing

* Postman / PowerShell (Invoke-RestMethod)

---

## 📂 Project Structure

```
project/
 ├── backend/
 │   ├── config/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── server.js
 │   └── .env
 ├── frontend/ (planned)
 └── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone repository

```
git clone https://github.com/USERNAME/library-project.git
cd library-project/backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the project

```
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🔐 API Endpoints

### Register

```
POST /api/auth/register
```

Body:

```
{
  "username": "test",
  "email": "test@email.com",
  "password": "123456"
}
```

---

### Login

```
POST /api/auth/login
```

---

## 🧪 Testing

The API was tested using:

* Postman
* PowerShell (Invoke-RestMethod)

---

## 🗄️ Database

MongoDB Atlas is used as a cloud database.

Structure:

```
library_db
 └── users
```

Passwords are securely hashed using bcrypt.

---

## 👥 Team

* Takacs Andras Csaba
* Tanko Agnes Maria

---

## 📌 Status

🚧 Project in progress
✔️ Authentication completed
🔜 CRUD for books, WebSocket integration, frontend

---

## 📜 License

This project is developed for educational purposes.
