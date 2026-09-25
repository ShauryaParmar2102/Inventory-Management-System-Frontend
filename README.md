# 📦 Inventory Management System

A full-stack **Inventory Management System** built using React, TypeScript, Node.js, Express and MongoDB.

This project was completed as a learning project to practice working with both the **frontend and backend** of a modern web application.

The system allows users to manage products, stock, sellers, purchases and sales through an inventory dashboard.

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

Building this project gave me experience working across a complete
full-stack application.

## ⚛️ Frontend Development

I practiced:

- ⚛️ Building interfaces with **React**
- 🔷 Using **TypeScript** with React
- 🧩 Creating and working with reusable components
- 🧭 Navigation with **React Router**
- 🔒 Creating protected routes
- 📝 Building and validating forms with **React Hook Form**
- 🎨 Building dashboard interfaces with **Ant Design**
- 📊 Displaying data with **Recharts**
- 🔄 Managing application state with **Redux Toolkit**
- 🌐 Making API requests with **RTK Query**
- 🔎 Implementing search and filtering
- 📄 Working with pagination
- 🪟 Working with modals
- 🐛 Debugging React and TypeScript errors

---

## 🟢 Backend Development

I practiced:

- 🟢 Building a backend with **Node.js**
- 🚂 Creating a REST API with **Express**
- 🔷 Using **TypeScript** on the backend
- 🛣️ Creating API routes
- 🎮 Working with controllers
- ⚙️ Separating application logic into services
- 🗃️ Creating database models
- 🔐 Implementing authentication
- 🎟️ Working with JSON Web Tokens (JWT)
- 🔑 Hashing passwords with bcrypt
- ✅ Validating data with Zod
- ❌ Handling API errors
- 📊 Creating sales reporting endpoints
- 🐛 Debugging backend and API problems

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

## 🔄 Full-Stack Development

One of the main things I practiced was understanding how the different
parts of a full-stack application communicate.

The general data flow is:

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

This helped me understand how an action on the frontend can travel
through an API, change information in the database and then update
the interface.

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
- 📦 Fixing missing package/import problems
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
    │   ├── package.json
    │   └── .env
    │
    ├── backend/
    │   ├── src/
    │   │   ├── modules/
    │   │   ├── routes/
    │   │   ├── middleware/
    │   │   └── utils/
    │   │
    │   ├── package.json
    │   └── .env
    │
    ├── LICENSE
    └── README.md

---

# ⚙️ Running the Project

## 1️⃣ Clone the Repository

    git clone YOUR_REPOSITORY_URL

Then enter the project:

    cd inventory-management-system

---

## 2️⃣ Install Backend Dependencies

    cd backend
    npm install

---

## 3️⃣ Backend Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

    NODE_ENV=development
    PORT=8000
    DATABASE_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

> ⚠️ Never commit your real `.env` file to GitHub.

---

## 4️⃣ Start the Backend

    npm run dev

The API will run locally on port `8000`.

---

## 5️⃣ Install Frontend Dependencies

Open another terminal:

    cd frontend
    npm install

---

## 6️⃣ Frontend Environment Variables

Create a `.env` file inside the `frontend` directory.

Example:

    VITE_BASE_URL=http://localhost:8000/api/v1
    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
    VITE_CLOUDINARY_API_KEY=your_api_key
    VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

---

## 7️⃣ Start the Frontend

    npm run dev

The Vite development server will normally run on port `5173`.

---

# 👨‍💻 Author

**Shaurya Parmar**

Web Development Student
