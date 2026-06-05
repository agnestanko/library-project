# 📚 Online Library Platform

A full-stack web application for managing books, users, and discussions in a digital library environment.

## 🚀 Quick Start

### Clone the repository

```bash
git clone https://github.com/agnestanko/library-project.git
cd library-project
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

## ✨ Features

* User authentication (JWT)
* Secure password hashing (bcrypt)
* Book management (CRUD)
* Comments system
* Real-time comments (Socket.IO)
* Categories, filters and search
* User profiles
* Role-based authorization (User/Admin)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* Socket.IO

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Testing

* Jest
* Supertest
* Postman

---

## 👥 Team

* Takacs Andras Csaba
* Tanko Agnes Maria

---

## 📜 License

Developed for educational purposes.
