<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)

# 🚀 TaskNova

### A modern full-stack task management web application built for productivity

Manage tasks efficiently with authentication, priorities, categories, analytics, PDF export, and a clean responsive UI.

**Live Demo Coming Soon** • **Portfolio Ready** • **Open Source**

</div>

---

# ✨ Features

| Feature                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| 🔐 JWT Authentication  | Secure login and registration system            |
| ✅ Full Task CRUD       | Create, update, delete, and complete tasks      |
| 📌 Priority Levels     | Low, Medium, High priority support              |
| 🗂️ Categories         | Organize tasks by Work, Study, Personal, Health |
| 📊 Dashboard Analytics | View total, completed, and pending tasks        |
| 🔍 Search & Filter     | Quickly find tasks instantly                    |
| 📄 PDF Export          | Download task reports as PDF                    |
| 📅 Smart Dates         | Better due date formatting                      |
| 🌙 Dark / Light Mode   | Clean responsive theme UI                       |
| 📱 Responsive Design   | Works on mobile, tablet, desktop                |

---

# 🔐 Security Features

| Feature               | Description                        |
| --------------------- | ---------------------------------- |
| 🛡️ Rate Limiting     | Prevents brute-force abuse         |
| 🔒 Password Hashing   | Secure passwords using bcrypt      |
| 🎫 JWT Tokens         | Token-based authentication         |
| 🌐 CORS Protection    | Controlled frontend/backend access |
| 🧹 Input Sanitization | Cleaner and safer requests         |
| 📦 Request Limits     | Prevents oversized payload abuse   |

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Ant Design
* Axios
* Day.js
* CSS

## Backend

* Node.js
* Express.js
* Sequelize ORM
* JWT
* bcrypt

## Database

* PostgreSQL

---

# 📡 API Endpoints

## Auth

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

## Todos

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | `/api/todos`           |
| GET    | `/api/todos/:id`       |
| POST   | `/api/todos`           |
| PUT    | `/api/todos/:id`       |
| PATCH  | `/api/todos/:id/check` |
| DELETE | `/api/todos/:id`       |

---

# 🚀 Getting Started

# Prerequisites

Install:

* Node.js
* PostgreSQL
* npm

---

# Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/jatingaur1/tasknova.git
cd tasknova
```

---

## 2️⃣ Backend Setup

```bash
cd Server
npm install
```

Create `.env`

```env
PORT=8000
JWT_KEY=your_secret_key
SEQ_CONNECTION=postgres://postgres:yourpassword@localhost:5432/tasknova
ALLOWED_ORIGINS=http://localhost:3000
ALLOWED_METHODS=GET,POST,PUT,PATCH,DELETE
```

---

## 3️⃣ Initialize Database

```bash
npm run db:setup
```

This will:

* Create database
* Create tables
* Add demo user
* Add sample tasks

---

## 4️⃣ Start Backend

```bash
npm start
```

Backend runs on:

```txt
http://localhost:8000
```

---

## 5️⃣ Frontend Setup

Open new terminal:

```bash
cd Frontend
npm install
npm start
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# 🔑 Demo Credentials

```txt
Username: demo
Password: demo123
```

---

# 📁 Project Structure

```bash
tasknova/
├── Frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layout/
│       ├── utils/
│       └── styles/
│
└── Server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── scripts/
    └── utils/
```

---

# 📸 Screenshots

Add screenshots here after uploading images.

```md
![Dashboard](Screenshots/1.png)
![Dark Mode](Screenshots/2.png)
![Login](Screenshots/3.png)
```

---

# 🌐 Deployment

You can deploy:

## Frontend

* Vercel
* Netlify

## Backend

* Render
* Railway
* Vercel Serverless

## Database

* Supabase PostgreSQL
* Railway PostgreSQL
* Neon DB

---

# 🚀 Future Improvements

* Notifications
* Drag & Drop Tasks
* Calendar View
* Team Collaboration
* Cloud Sync
* AI Task Suggestions

---

# 🤝 Contributing

Contributions are welcome.

```bash
git fork
git clone
git checkout -b feature-name
git commit -m "Added feature"
git push origin feature-name
```

Then open Pull Request.

---

# 👨‍💻 Author

Made with ❤️ by **Jatin**

GitHub: https://github.com/jatingaur1

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## ⭐ If you like this project, give it a star on GitHub ⭐

</div>
