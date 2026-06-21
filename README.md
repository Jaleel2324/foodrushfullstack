# Food Rush

Food Rush is a full-stack food ordering platform built with React, Node.js, Express, and MongoDB. It was created to simulate a modern restaurant delivery experience with customer ordering flows, cart management, checkout, and admin-side product and order management.

## Live Demo

- **Frontend:** [<YOUR_FRONTEND_URL>](<YOUR_FRONTEND_URL>)
- **Backend / API:** [<YOUR_BACKEND_URL>](<YOUR_BACKEND_URL>)
- **GitHub Repo:** [https://github.com/Jaleel2324/foodrushfullstack](https://github.com/Jaleel2324/foodrushfullstack)

> If the app is not deployed yet, remove this section until you have a live link.

---

## Overview

Food Rush was built to demonstrate full-stack software engineering skills through a real-world style e-commerce workflow. The project includes a customer-facing ordering experience and an admin-facing management side, with a focus on clean frontend presentation, REST API development, and database integration.

The goal of this project is to show that I can:

- Build responsive user-facing applications
- Connect frontend and backend systems into a working product
- Design and manage application state and data flow
- Work with CRUD operations, APIs, and MongoDB data models
- Build software around practical business workflows

---

## Features

### Customer Features

- Browse food items
- Filter products by category
- Add items to cart
- Remove items from cart
- View cart summary
- Checkout flow
- Responsive navigation
- Mobile-friendly layout
- Interactive UI transitions

### Admin Features

- Manage products
- View incoming orders
- Update inventory or item details
- Access dashboard-style management views

### Backend Features

- REST API architecture
- MongoDB database integration
- Mongoose-based data modeling
- Product and order data handling

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- CSS3
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Deployment / Tools
- GitHub
- Vercel
- Render
- Postman

---

## Preview

The application includes a customer ordering interface, animated product browsing experience, cart and checkout flow, and an admin-side management system.

### Homepage
![Homepage](./public/screenshots/homepage.png)

### Menu / Product Listing
![Products](./public/screenshots/products.png)

### Cart / Checkout
![Cart](./public/screenshots/cart.png)

### Admin Dashboard
![Admin Dashboard](./public/screenshots/admin-dashboard.png)


---

## Project Architecture

Food Rush follows a standard full-stack architecture:

- **React frontend** handles the user interface, routing, product browsing, cart state, and checkout experience
- **Express backend** handles API routes, business logic, and communication with the database
- **MongoDB Atlas** stores product, order, and related application data
- **Mongoose** manages schemas and database models
- **Vercel / Render** can be used to deploy the frontend and backend separately

This structure makes it easier to scale the frontend and backend independently while keeping the codebase organized around product workflows.

---

## Project Structure

```bash
foodrushfullstack/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── features/
│       ├── router/
│       └── styles/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── package.json
└── README.md
```

> Update this structure if your actual folders are different.

---

## Key Engineering Areas

This project was built to improve and demonstrate:

- Full-stack application architecture
- State management
- API development
- MongoDB integration
- Responsive frontend engineering
- UI animation systems
- Product-oriented application design

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jaleel2324/foodrushfullstack.git
cd foodrushfullstack
```

### 2. Install dependencies

If frontend and backend are separated:

```bash
cd client
npm install
cd ../server
npm install
```

If the repo uses a single root install, update this section to match your setup.

### 3. Set up environment variables

Create a `.env` file in your backend folder and add the values your app needs.

Example:

```env
PORT=5000
MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>
CLIENT_URL=<YOUR_FRONTEND_URL>
```


### 4. Run the backend

```bash
cd server
npm run dev
```

### 5. Run the frontend

```bash
cd client
npm run dev
```

### 6. Open in browser

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:5000
```

---

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm run dev
npm start
```

> Update these commands if your actual package scripts are different.

---

## API Overview

Example API responsibilities may include:

- `GET /api/products` — fetch all products
- `GET /api/products/:id` — fetch a single product
- `POST /api/orders` — create a new order
- `GET /api/orders` — fetch orders
- `POST /api/products` — create a new product
- `PUT /api/products/:id` — update product details
- `DELETE /api/products/:id` — remove a product

> Replace these with your real endpoints if they differ.

---

## Current Strengths of the Project

- Combines frontend, backend, and database integration
- Simulates a realistic food ordering workflow
- Includes both customer-side and admin-side functionality
- Demonstrates product-focused full-stack development
- Shows practical use of REST APIs and persistent data storage

---

## Current Limitations

Like many growing portfolio projects, Food Rush still has room for improvement. Areas I plan to improve include:

- Stronger validation and error handling
- More robust authentication and authorization
- Better testing coverage
- Improved admin controls
- More polished production deployment setup
- Expanded order lifecycle handling

---

## Future Improvements

- Add user authentication
- Add payment integration
- Add order status tracking
- Improve admin analytics
- Add search and sorting features
- Add stronger backend validation
- Add automated tests
- Improve loading, error, and empty states
- Add a better deployment pipeline

---

## Why I Built This

I built Food Rush to practice building software around a realistic business workflow rather than a static demo. I wanted a project that would let me work across frontend UI, backend APIs, database modeling, and admin-side product management in one complete application.

This project helped me strengthen my understanding of how full-stack systems come together in a product context.

---

## What This Project Represents

Food Rush represents the kind of engineer I am working to become:

- Product-minded
- Comfortable across frontend and backend development
- Interested in practical business applications
- Focused on both user experience and technical structure

It reflects my goal of building software that is not only functional, but organized, usable, and ready to evolve.

---


## Contact

If you'd like to connect about junior software engineering opportunities, freelance work, or collaboration:

- **GitHub:** [https://github.com/Jaleel2324](https://github.com/Jaleel2324)
- **Portfolio:** [https://jaleel.dev/](https://jaleel.dev/)
- **LinkedIn:**
- **Email:** jaleelpips@gmail.com

---

## License

This project is open source under the MIT License.

---

## Final Note

Food Rush is a portfolio project that continues to evolve as I improve my full-stack engineering skills, strengthen deployment and architecture decisions, and build more production-minded software.
