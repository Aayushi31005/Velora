# Velora

A modern full-stack e-commerce platform built with React, TypeScript, Node.js, Express, PostgreSQL, and Prisma.

Velora simulates a production-style commerce experience with authentication, product discovery, shopping cart management, checkout workflows, order tracking, and an admin dashboard.

---

## Live Demo

Frontend: [Coming Soon]

Backend API: [Coming Soon]

---

## Features

### Customer Features

* User Registration & Login
* JWT Authentication
* Product Catalog
* Category Filtering
* Product Search
* Sorting & Pagination
* Shopping Cart
* Checkout Workflow
* Order History
* Order Details

### Admin Features

* Product Management
* Category Management
* Order Status Management
* Analytics Dashboard
* Role-Based Authorization

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Zustand
* TanStack Query
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL (Neon)

### ORM

* Prisma ORM

### Authentication

* JWT Authentication
* bcrypt Password Hashing

### Deployment

* Vercel (Frontend)
* Railway / Render (Backend)
* Neon PostgreSQL

---

## Architecture

Velora follows a modular feature-based architecture.

Backend domains are organized into:

* Auth
* Products
* Categories
* Cart
* Orders
* Admin

Request flow:

Client → API → Controller → Service → Prisma → PostgreSQL

Frontend uses:

* React Query for server state
* Zustand for client state
* Feature-based folder organization

---

## Screenshots

### Home Page

(Add Screenshot)

### Product Catalog

(Add Screenshot)

### Product Details

(Add Screenshot)

### Shopping Cart

(Add Screenshot)

### Admin Dashboard

(Add Screenshot)

---

## Key Engineering Concepts

* JWT Authentication
* Role-Based Access Control
* Relational Database Design
* Server State Management
* Cart Synchronization
* Checkout Workflows
* Inventory Validation
* Admin Authorization
* REST API Design

---

## Local Setup

### Backend

npm install

npm run dev

### Frontend

npm install

npm run dev

---

## Future Improvements

* Dark Mode
* Product Image Management
* Skeleton Loaders
* Enhanced Analytics
* Payment Integration
* Responsive UI Enhancements

---

## Author

Built by Aayushi Narang

Computer Science Student | Web Developer Intern
