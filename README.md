# 📦 Inventory Management System

A full-stack **Inventory Management System** built using React, TypeScript, Node.js, Express and MongoDB.

This project was completed as a learning project to practice working with both the **frontend and backend** of a modern web application.

---

## 📦 About the App

The **Inventory Management System** is a full-stack web application designed to help manage inventory, stock and sales through one dashboard.

Users can manage products, categories, brands and sellers, add stock, record purchases and sales, and view sales reports and revenue statistics.

The application connects a **React and TypeScript frontend** to a **Node.js and Express backend**, with **MongoDB** used to store users, products, inventory and sales data.

It is designed as an **internal inventory management dashboard** rather than a customer-facing online store.

---

## 🚀 Features

- 🔐 User registration and login
- 🛡️ JWT authentication and protected routes
- 📊 Inventory dashboard
- ➕ Create products
- 📦 Manage products
- 🏷️ Manage categories and brands
- 👤 Manage sellers
- 📥 Add stock to products
- 💰 Record product sales
- 🛒 Manage purchases
- ✏️ Update inventory information
- 🗑️ Delete inventory records
- 🔎 Search products and records
- 📄 Pagination
- 📈 Daily sales reports
- 📈 Weekly sales reports
- 📈 Monthly sales reports
- 📈 Yearly sales reports
- 💵 Revenue statistics
- 👤 User profile management
- 🔑 Change password

---

# 🧠 What I Practiced

Working on this project gave me experience with frontend development, backend development, databases, APIs and debugging a complete full-stack application.

## ⚛️ Frontend Development

I practiced:

- ⚛️ Building interfaces with **React**
- 🔷 Using **TypeScript** with React
- 🧩 Creating reusable components
- 🧭 Navigation with **React Router**
- 🔒 Creating protected routes
- 📝 Building and validating forms with **React Hook Form**
- 🎨 Building dashboard interfaces with **Ant Design**
- 📊 Displaying data with **Recharts**
- 🔄 Managing state with **Redux Toolkit**
- 🌐 Making API requests with **RTK Query**
- 🔎 Implementing search, filtering and pagination
- 🪟 Working with modals
- 🐛 Debugging React and TypeScript errors

---

## 🟢 Backend Development

I practiced:

- 🟢 Building a backend with **Node.js**
- 🚂 Creating REST APIs with **Express**
- 🔷 Using **TypeScript** on the backend
- 🛣️ Creating API routes
- 🎮 Working with controllers
- ⚙️ Separating application logic into services
- 🍃 Working with **MongoDB and Mongoose**
- 🔐 Implementing authentication
- 🎟️ Working with **JSON Web Tokens (JWT)**
- 🔑 Hashing passwords with **bcrypt**
- ✅ Validating data with **Zod**
- 📦 Implementing CRUD operations
- 📊 Creating sales reporting endpoints
- 🐛 Debugging backend and API problems

---

## 🔗 Full-Stack Development

I also practiced:

- 🔄 Connecting the React frontend to the Express backend
- 🌐 Sending and receiving data through REST APIs
- 🍃 Storing and retrieving data with MongoDB
- 🔐 Connecting frontend authentication with backend JWT authentication
- 📦 Managing products, stock, sellers, purchases and sales
- 🧠 Tracing data through the frontend, API and database
- 🐛 Debugging problems across the full application

---

## 🍃 Database

I practiced working with:

- 🍃 **MongoDB**
- 🔗 **Mongoose**
- 📄 MongoDB documents
- 🗃️ Database models
- 🔍 Querying data
- ➕ Creating records
- ✏️ Updating records
- 🗑️ Deleting records
- 📦 Managing inventory data
- 📈 Retrieving data for reports

---

## 🔄 How the Full-Stack Application Connects

One of the main things I practiced was understanding how the different parts of a full-stack application communicate.

The general data flow is:

```text
React UI
    ↓
Redux / RTK Query
    ↓
REST API
    ↓
Express Routes
    ↓
Controllers
    ↓
Services
    ↓
Mongoose
    ↓
MongoDB
```

This helped me understand how an action on the frontend can travel through an API, change information in the database and then update the interface.

---

## 🐛 Debugging

Debugging was an important part of working on this project.

I practiced:

- 🔎 Reading TypeScript compiler errors
- 🧭 Tracing problems between different files
- ⚛️ Debugging React components
- 🌐 Debugging API requests
- 🟢 Debugging Express routes
- 🍃 Debugging MongoDB/Mongoose issues
- 📦 Fixing missing packages and imports
- 🔐 Debugging authentication
- 🔄 Debugging Redux and RTK Query
- 🧪 Testing frontend and backend functionality
- 🧠 Reading and understanding an existing codebase
- 🛠️ Modifying existing functionality

---

# 🛠️ Tech Stack

## 💻 Frontend

![React](https://img.shields.io/badge/React-Frontend-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-purple)
![Redux](https://img.shields.io/badge/Redux_Toolkit-State_Management-purple)
![Ant Design](https://img.shields.io/badge/Ant_Design-UI-blue)

- React
- TypeScript
- Vite
- Redux Toolkit
- RTK Query
- React Router
- React Hook Form
- Ant Design
- Recharts

## 🖥️ Backend

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express-REST_API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod
- JSON Web Tokens
- bcrypt

---

# 📂 Project Structure

```text
inventory-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── routes/
│   │   └── types/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   │
│   └── package.json
│
├── LICENSE
└── README.md
```

> `.env` files are not included in the repository because they can contain private configuration and credentials.

---

# ⚙️ Running the Project

## 1️⃣ Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Then enter the project:

```bash
cd inventory-management-system
```

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

## 3️⃣ Backend Environment Variables

Create a `.env` file inside the `backend` directory:

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never commit your real `.env` file to GitHub.

## 4️⃣ Start the Backend

```bash
npm run dev
```

The backend API will run locally on port `8000`.

## 5️⃣ Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## 6️⃣ Frontend Environment Variables

Create a `.env` file inside the `frontend` directory:

```env
VITE_BASE_URL=http://localhost:8000/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 7️⃣ Start the Frontend

```bash
npm run dev
```

The Vite development server will normally run on port `5173`.

---

# 👨‍💻 Author

**Shaurya Parmar**

Web Development Student

Interested in **frontend, backend and full-stack web development**.
