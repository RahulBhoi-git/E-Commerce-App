# E-Commerce App

A full-stack e-commerce web application with a customer storefront, an admin dashboard, and a backend API. The project is built to demonstrate end-to-end full-stack development using React, Node.js, Express, and MongoDB.

## Overview

This project simulates the core workflow of an online shopping platform:

- customers can browse products, filter collections, view product details, add items to cart, place orders, and view order history
- admins can add products, remove products, view customer orders, and update order status
- the backend handles authentication, product management, cart persistence, order processing, and payment integration

## Features

### Customer features
- User registration and login
- Browse all products
- Product detail page
- Category and subcategory filtering
- Size-based product selection
- Add to cart and update cart quantity
- Place orders
- View order history
- Payment options with Stripe, Razorpay, and Cash on Delivery

### Admin features
- Admin login
- Add new products with multiple images
- Remove products
- View all customer orders
- Update order delivery status

### Backend features
- REST API with Express
- MongoDB database with Mongoose models
- JWT-based authentication
- Password hashing with bcrypt
- Cloudinary image upload integration
- Payment gateway integration

## Tech Stack

### Frontend
- React 19
- React Router
- Axios
- Tailwind CSS
- Vite
- React Toastify

### Backend
- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- bcrypt
- multer
- Cloudinary
- Stripe
- Razorpay

## Project Structure

```text
E-Commerce App/
├── admin/        # Admin dashboard
├── backend/      # Express API and database logic
├── frontend/     # Customer-facing storefront
└── docs/         # Generated project/interview documents
```

## Architecture

This project follows a client-server architecture with three separate parts:

- `frontend` for customer-facing UI
- `admin` for admin operations
- `backend` for business logic and API endpoints

Both the customer app and admin dashboard communicate with the same backend API.

## Main Modules

### Frontend
- `pages/`: route-level pages like Home, Collection, Cart, Orders, and Checkout
- `components/`: reusable UI building blocks
- `context/ShopContext.jsx`: shared state for products, cart, token, and helpers

### Admin
- `pages/Add.jsx`: add new products
- `pages/List.jsx`: list and remove products
- `pages/Order.jsx`: view and manage orders

### Backend
- `routes/`: API route definitions
- `controller/`: business logic
- `models/`: MongoDB schemas
- `middleware/`: auth and file upload handling
- `config/`: MongoDB and Cloudinary setup

## API Modules

- `/api/user` for user authentication and admin login
- `/api/product` for product operations
- `/api/cart` for cart operations
- `/api/order` for order and payment operations

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB connection string
- Cloudinary account
- Stripe account
- Razorpay account

## Installation

Clone the repository:

```bash
git clone https://github.com/RahulBhoi-git/E-Commerce-App.git
cd E-Commerce-App
```

Install dependencies for each part of the project:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Create a `.env` file inside the `admin` folder:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Running the Project

### Start the backend

```bash
cd backend
npm run server
```

### Start the frontend

```bash
cd frontend
npm run dev
```

### Start the admin panel

```bash
cd admin
npm run dev
```

## Default Local URLs

- Frontend: `http://localhost:5173`
- Admin: `http://localhost:5174` or the next available Vite port
- Backend: `http://localhost:4000`

## How the Application Works

1. Admin logs in and adds products with images.
2. Product images are uploaded to Cloudinary and product data is stored in MongoDB.
3. Customers browse products on the storefront.
4. Customers add items to cart and proceed to checkout.
5. Orders are created through the backend.
6. Admin can view all orders and update delivery status.

## Learning Outcomes

This project helped strengthen understanding of:

- full-stack application structure
- React state management with Context API
- REST API development with Express
- MongoDB schema design with Mongoose
- authentication using JWT
- third-party integration with Cloudinary and payment gateways
- building separate customer and admin interfaces on one backend

## Current Limitations

This project is strong as a portfolio and learning project, but some production-level improvements are still possible:

- stronger backend validation
- more secure payment verification
- automated testing
- inventory and stock management
- pagination and server-side filtering
- better role-based admin authorization

## Future Improvements

- Add inventory tracking
- Add coupon and discount system
- Add wishlist functionality
- Add product reviews and ratings
- Add email notifications
- Add analytics dashboard for admin
- Add secure webhook-based payment verification
- Add test coverage for critical flows

## Build Notes

The customer frontend and admin panel both build successfully with Vite. There are still lint issues in the codebase that can be cleaned up as part of future refactoring.

## Author

Rahul Bhoi

GitHub: [RahulBhoi-git](https://github.com/RahulBhoi-git)

