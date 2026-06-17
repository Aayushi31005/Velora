# Velora

A modern full-stack e-commerce platform built with React, TypeScript, Node.js, Express, PostgreSQL, and Prisma.

Velora simulates a production-style commerce experience with authentication, product discovery, shopping cart management, checkout workflows, order tracking, and an admin dashboard.

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

<img width="1918" height="960" alt="image" src="https://github.com/user-attachments/assets/6f36ad90-ec22-4c61-9676-39c6e1081ca1" />


### Product Catalog
<img width="1915" height="1017" alt="image" src="https://github.com/user-attachments/assets/6e71784b-dc15-4d99-b8bc-4e1d0e5d53e4" />


<br><br>


<img width="1912" height="1015" alt="image" src="https://github.com/user-attachments/assets/4b0c69f2-a4d3-42ab-bbb9-d8700062f24d" />

### Shopping Cart

<img width="1917" height="1017" alt="image" src="https://github.com/user-attachments/assets/ea1cfd3c-0451-4466-840a-9bcc8d88c0e6" />


### Admin Dashboard

<img width="1918" height="1015" alt="image" src="https://github.com/user-attachments/assets/2d73ab26-8157-4d1c-8811-797643a50b46" />


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
