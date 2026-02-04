#  Simple Banking System

A full-stack banking simulation for **Agile Software Development Course**.

---

##  How to Run

### Prerequisites
- Node.js 18+ installed
- npm

### Step 1: Start Backend Server

```bash
cd backend
npm install
npm start
```

Backend runs at: **http://localhost:3000**

### Step 2: Start Frontend Server

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

### Step 3: Use the App

1. Open **http://localhost:5173** in your browser
2. Click "Create an account" to register
3. Login with your credentials
4. Start banking!

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express, Sequelize, SQLite |
| Frontend | React, Vite, React Router |
| Auth | JWT (JSON Web Tokens) |

---

##  API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/register` | Register new user | No |
| POST | `/api/login` | Login user | No |
| GET | `/api/account` | Get account details | Yes |
| POST | `/api/deposit` | Deposit money | Yes |
| POST | `/api/withdraw` | Withdraw money | Yes |
| GET | `/api/transactions` | Get transaction history | Yes |

---

##  Authentication Flow

1. User registers → account auto-created
2. User logs in → receives JWT token
3. Token stored in localStorage
4. All protected routes require token in header

---

##  Project Structure

```
Agile/
├── backend/
│   └── src/
│       ├── config/        # Database & JWT config
│       ├── controllers/   # HTTP request handlers
│       ├── middleware/    # Auth & error handling
│       ├── models/        # Database models
│       ├── routes/        # API routes
│       ├── services/      # Business logic
│       └── app.js         # Entry point
│
├── frontend/
│   └── src/
│       ├── components/    # Reusable components
│       ├── context/       # Auth state management
│       ├── pages/         # Page components
│       ├── routes/        # Route protection
│       ├── services/      # API calls
│       └── App.jsx        # Main app
│
├── API.md                 # API documentation
└── README.md              # This file
```



##  Business Rules

- Balance cannot be negative
- Amount must be positive
- One account per user
- Account auto-created on registration

---
