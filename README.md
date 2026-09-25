# 📦 Inventory Management System — Frontend

The frontend for a full-stack **Inventory Management System**, built with **React, TypeScript and Vite**.

This project was completed as a learning project to practice building a modern frontend, managing application state, communicating with a REST API and working with a larger React codebase.

---

## 📦 About the App

The Inventory Management System is an internal dashboard for managing inventory and sales.

The frontend provides the user interface for:

- 📊 Viewing inventory statistics
- ➕ Creating products
- 📦 Managing products
- 📥 Adding product stock
- 🏷️ Managing categories and brands
- 👤 Managing sellers
- 🛒 Viewing and managing purchases
- 💰 Recording and managing sales
- 📈 Viewing sales reports
- 💵 Tracking sales and revenue
- 👤 Managing user profiles
- 🔐 Registering and logging in

The frontend communicates with a separate **Node.js and Express REST API**, which handles the application's backend logic and MongoDB database operations.

---

# 🚀 Features

- 🔐 User registration and login
- 🛡️ Protected routes
- 📊 Inventory dashboard
- ➕ Product creation
- 📦 Product management
- 📥 Stock management
- 🏷️ Category and brand management
- 👤 Seller management
- 🛒 Purchase management
- 💰 Sales management
- 🔎 Search and filtering
- 📄 Pagination
- 🪟 Modals
- 📈 Sales charts and reports
- 💵 Revenue statistics
- 👤 User profile management
- 🔑 Change password

---

# 🧠 What I Practiced

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

## 🔗 Working With a Backend API

I also practiced:

- 🌐 Connecting React to a REST API
- 📤 Sending data to the backend
- 📥 Retrieving data from the backend
- 🔄 Using RTK Query queries and mutations
- 🔐 Handling authentication from the frontend
- 🎟️ Working with JWT authentication
- 📦 Displaying database information in React
- 🔄 Updating the interface after API changes
- ❌ Handling API errors
- 🐛 Debugging communication between the frontend and backend

---

## 🐛 Debugging

Debugging was an important part of working on this project.

I practiced:

- 🔎 Reading TypeScript compiler errors
- ⚛️ Debugging React components
- 📦 Fixing missing packages and imports
- 🌐 Debugging API requests
- 🔐 Debugging authentication
- 🔄 Debugging Redux and RTK Query
- 🧭 Tracing problems between different files
- 🧪 Testing application functionality
- 🧠 Reading and understanding an existing codebase
- 🛠️ Modifying existing functionality

---

# 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-Frontend-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-purple)
![Redux](https://img.shields.io/badge/Redux_Toolkit-State_Management-purple)
![Ant Design](https://img.shields.io/badge/Ant_Design-UI-blue)

- ⚛️ React
- 🔷 TypeScript
- ⚡ Vite
- 🔄 Redux Toolkit
- 🌐 RTK Query
- 🧭 React Router
- 📝 React Hook Form
- 🎨 Ant Design
- 📊 Recharts

---

# 🔄 How the Frontend Connects

The frontend sends requests to the backend REST API using RTK Query.

```text
React Components
       ↓
Redux / RTK Query
       ↓
REST API
       ↓
Node.js / Express Backend
       ↓
MongoDB
```

For example, when a user creates a product, the frontend collects the form data and sends it to the backend API. The backend stores the product in MongoDB and sends a response back to the frontend.

---

# 📂 Frontend Structure

```text
inventory-management-system-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── types/
│   └── ...
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Running the Frontend

## 1️⃣ Clone the Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

Enter the project:

```bash
cd inventory-management-system-frontend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages into `node_modules`.

> `node_modules` is not included in the GitHub repository.

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=http://localhost:8000/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> ⚠️ The real `.env` file should not be committed to GitHub.

---

## 4️⃣ Start the Frontend

```bash
npm run dev
```

The Vite development server will normally start at:

```text
http://localhost:5173
```

The backend API must also be running for features that require server data.

---

# 🔗 Backend

This frontend is part of a full-stack Inventory Management System.

The backend is maintained in a separate repository:

**Backend Repository:** `ADD_YOUR_BACKEND_REPOSITORY_LINK_HERE`

The backend is built using:

- 🟢 Node.js
- 🚂 Express
- 🔷 TypeScript
- 🍃 MongoDB
- 🔗 Mongoose
- 🔐 JWT authentication
- ✅ Zod

---

# 🔗 Using the Frontend and Backend Together

This Inventory Management System is split into two repositories:

- ⚛️ **Frontend** — React, TypeScript, Redux Toolkit and RTK Query
- 🟢 **Backend** — Node.js, Express, TypeScript and MongoDB

To run the complete full-stack application, both repositories are required.

## 1️⃣ Create a Project Folder

Create a folder for the complete application:

```bash
mkdir inventory-management-system
cd inventory-management-system
```

## 2️⃣ Clone the Frontend

Clone the frontend repository into a folder called `frontend`:

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL frontend
```

## 3️⃣ Clone the Backend

Clone the backend repository into a folder called `backend`:

```bash
git clone YOUR_BACKEND_REPOSITORY_URL backend
```

Your project should now look like:

```text
inventory-management-system/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── backend/
    ├── src/
    ├── package.json
    └── ...
```

## 4️⃣ Install Dependencies

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Then install the backend dependencies:

```bash
cd ../backend
npm install
```

## 5️⃣ Configure Environment Variables

Create the required `.env` files for both the frontend and backend.

### Frontend `.env`

```env
VITE_BASE_URL=http://localhost:8000/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Backend `.env`

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Environment files are not included in the repositories because they may contain private credentials.

## 6️⃣ Run the Application

Make sure MongoDB is running.

Open one terminal for the backend:

```bash
cd backend
npm run dev
```

Then open another terminal for the frontend:

```bash
cd frontend
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

The backend API will normally run at:

```text
http://localhost:8000/api/v1
```

Both applications need to be running for the complete Inventory Management System to work.

# 👨‍💻 Author

**Shaurya Parmar**

Web Development Student

Interested in **frontend, backend and full-stack web development**.
