<div align="center">
  <h1>🛍️ Nepa</h1>
  <p><strong>AI-Powered Full-Stack E-Commerce Platform</strong></p>
  <p><i>An optimized, intuitive, and secure B2C shopping experience.</i></p>
</div>

<br />

## 📖 About the Project
Nepa is a full-stack B2C e-commerce solution designed to provide a highly optimized, intuitive, and secure shopping experience. Built with a decoupled architecture, it features a modern consumer-facing web application powered by **React** and **Redux Toolkit**, backed by a robust **Node.js/Express** API and a **PostgreSQL** relational database.

> **Note:** This project is currently under active development. The consumer storefront and core backend architecture are functional, while the Administrative Dashboard and Gemini AI search modules are works-in-progress.

## ✨ Features
* **Consumer Storefront:** Responsive, mobile-first UI with dynamic product filtering, sorting, and pagination.
* **Shopping Cart & Checkout:** Real-time cart state management using Redux Toolkit.
* **Secure Authentication:** JWT-based user authentication and authorization (User vs. Admin roles) with password recovery functionality.
* **Relational Data Integrity:** Strict PostgreSQL schema design ensuring ACID compliance for users, products, and order histories.
* **Cloud Media Management:** Cloudinary integration for handling and optimizing product galleries and user avatars.
* **Admin Dashboard (WIP):** Role-protected interface for inventory management and sales analytics using Recharts.
* **AI Discovery (WIP):** Integration with Google Gemini API for natural language product searches.

## 🛠️ Technology Stack

### Frontend (Client & Dashboard)
* **React.js**
* **Tailwind CSS**
* **Redux Toolkit** (State Management)
* **React Router DOM**
* **Recharts** (Data Visualization)

### Backend Server
* **Node.js**
* **Express.js**
* **JSON Web Tokens (JWT) & Bcrypt**

### Database
* **PostgreSQL**
* **pg** (Node Postgres Client)

### Third-Party Services
* **Google Gemini API** (In Development)
* **Stripe API** (In Development)
* **Cloudinary**
* **Nodemailer**

## 🏗️ System Architecture
Nepa utilizes a decoupled architecture:
1.  **Client Application:** The main storefront where consumers browse products and manage their cart.
2.  **REST API:** A Node/Express backend that securely processes requests, handles business logic, and interacts with the PostgreSQL database.
3.  **Admin Dashboard:** A separate React application for store managers to handle inventory and monitor platform analytics.

## 💻 Getting Started

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm**
* **PostgreSQL** (v14 or higher)

### Environment Variables
Create a `config.env` file inside the `server/config` directory and populate it with the following:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

# PostgreSQL Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=nepa_store
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# Authentication
JWT_SECRET_KEY=your_secure_jwt_secret
JWT_EXPIRES_IN=30d
COOKIE_EXPIRES_IN=30

# Cloudinary 
CLOUDINARY_CLIENT_NAME=your_cloudinary_name
CLOUDINARY_CLIENT_API=your_cloudinary_api_key
CLOUDINARY_CLIENT_SECRET=your_cloudinary_secret

# Stripe 
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Nodemailer
SMTP_SERVICE=gmail
SMTP_MAIL=your_app_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key