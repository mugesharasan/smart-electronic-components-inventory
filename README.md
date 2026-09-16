# Smart Electronic Components Inventory System

A full-stack **MERN Stack Inventory Management System** designed to manage electronic components, monitor stock levels, and provide administrators with an easy-to-use dashboard for inventory operations.

## 📌 Project Overview

The Smart Electronic Components Inventory System is a web-based application developed using the **MERN stack**.

The application allows users to securely log in and provides administrators with tools to manage electronic component inventory, including adding, updating, deleting, searching, and monitoring products.

The system also provides **low-stock alerts** and an **admin dashboard** to help monitor inventory efficiently.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Password encryption using bcrypt
* Protected routes
* Secure authentication flow

### 📦 Inventory Management

* Add new electronic components
* View available components
* Update component details
* Delete components
* Track component quantities
* Manage product categories

### 🔎 Search & Filtering

* Search components by name
* Filter products by category
* Quickly find inventory items

### ⚠️ Low Stock Monitoring

* Identify components with low stock
* Display low-stock alerts
* Helps administrators maintain sufficient inventory

### 📊 Admin Dashboard

* Inventory overview
* Product statistics
* Stock monitoring
* Category-based information
* Easy-to-use dashboard interface

### 📱 Responsive UI

* Responsive design
* Clean and modern interface
* Works across desktop and mobile screen sizes

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Tailwind CSS
* React Router
* Axios
* Recharts
* React Icons

### Backend

* Node.js
* Express.js
* TypeScript
* REST API

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* Vercel

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ Axios / HTTP
                               ▼
                    ┌─────────────────────┐
                    │    Express.js API   │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌─────────────────────┐
                    │       MongoDB       │
                    │       Database      │
                    └─────────────────────┘
```

---

## 📂 Project Structure

```text
smart-electronic-components-inventory/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── api/
│       ├── assets/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.ts
│
├── .gitignore
├── package.json
└── README.md
```

> The exact folder names may vary depending on the current version of the project.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mugesharasan/smart-electronic-components-inventory.git
```

### 2. Navigate to the Project

```bash
cd smart-electronic-components-inventory
```

### 3. Install Dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend/server directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Example

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory
JWT_SECRET=your_secret_key
```

**Do not upload your `.env` file to GitHub.**

Make sure `.env` is included in `.gitignore`.

---

## ▶️ Running the Application Locally

### Start the Backend

From the server directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal and navigate to the client directory:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🔄 Application Workflow

```text
User
  │
  ▼
Register / Login
  │
  ▼
JWT Authentication
  │
  ▼
Admin Dashboard
  │
  ├── View Products
  ├── Add Product
  ├── Update Product
  ├── Delete Product
  ├── Search Products
  ├── Filter by Category
  └── Monitor Low Stock
              │
              ▼
         REST API
              │
              ▼
           MongoDB
```

---

## 🔌 REST API

The backend provides REST APIs for authentication and inventory management.

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Products

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/products`     | Get all products  |
| GET    | `/api/products/:id` | Get product by ID |
| POST   | `/api/products`     | Add a new product |
| PUT    | `/api/products/:id` | Update product    |
| DELETE | `/api/products/:id` | Delete product    |

> API endpoint names should be updated if your current backend uses different route paths.

---

## 🧪 API Testing

The REST APIs were tested using **Postman**.

Example product request:

```json
{
  "name": "Arduino Uno",
  "category": "Microcontroller",
  "quantity": 25,
  "price": 450
}
```

Example response:

```json
{
  "message": "Product created successfully",
  "product": {
    "name": "Arduino Uno",
    "category": "Microcontroller",
    "quantity": 25,
    "price": 450
  }
}
```

---

## 🔒 Security

The application implements basic security mechanisms including:

* JWT authentication
* Password hashing using bcrypt
* Protected API routes
* Environment variables for sensitive configuration
* Authentication-based access control

---

## 📊 Key Learning Outcomes

Through this project, I gained practical experience in:

* Building a full-stack MERN application
* Developing RESTful APIs
* Connecting React with Express.js
* Working with MongoDB and Mongoose
* Implementing JWT authentication
* Password hashing with bcrypt
* Creating protected routes
* Managing application state
* Implementing CRUD operations
* Searching and filtering data
* Building responsive user interfaces
* Testing APIs with Postman
* Deploying web applications using Vercel
* Using Git and GitHub for version control

---

## 🚀 Future Enhancements

Potential improvements include:

* Role-based access control
* Inventory transaction history
* Supplier management
* Purchase and sales tracking
* Email notifications for low-stock products
* Advanced analytics and reports
* Export inventory data to Excel/PDF
* Pagination for large inventories
* Improved dashboard analytics

---

## 📸 Screenshots

Add screenshots of your application here.

### Login

```text
Add your login page screenshot here
```

### Admin Dashboard

```text
Add your dashboard screenshot here
```

### Product Management

```text
Add your product management screenshot here
```

### Add Product

```text
Add your add-product screenshot here
```

---

## 🎯 Project Highlights

* **Full-stack MERN application**
* **JWT authentication**
* **bcrypt password hashing**
* **RESTful API architecture**
* **MongoDB database integration**
* **CRUD inventory management**
* **Search and category filtering**
* **Low-stock monitoring**
* **Admin dashboard**
* **Responsive UI**
* **Postman API testing**
* **GitHub version control**
* **Vercel deployment**

---

## 👨‍💻 Author

**Mugesh B**

B.Tech Information Technology
Java & MERN Stack Developer

## ⭐ If You Like This Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
