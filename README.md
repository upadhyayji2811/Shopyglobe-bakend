# ShoppyGlobe Backend

ShoppyGlobe is a backend e-commerce API built using Node.js, Express.js, and MongoDB. It supports product listing, user authentication, and a cart system with secure operations.

---

## github repository

🔗 [ShoppyGlobe github repository]()

---

---

## 🚀 Features

- User Authentication (Register/Login)
- Product CRUD APIs
- Cart Management (Add, Update, Remove Items)
- Error Handling Middleware
- MongoDB Integration with Compass support
- RESTful API Structure

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- dotenv for environment variables

---

## 🧩 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ShoppyGlobe_backend.git
cd ShoppyGlobe_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shoppyglobe
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

## Environment Variables

This project uses environment variables to configure sensitive information.

1. Create a `.env` file in the root directory of the project.
2. Copy the contents from `.env.example` and fill in the values.

### 4. Set up MongoDB Locally

- Download MongoDB and install MongoDB Compass
- Start MongoDB Server
- Open MongoDB Compass
- Connect using:

```
mongodb://localhost:27017/shoppyglobe
```

- Create a database called `shoppyglobe` manually or it will be auto-created on app start.

---

## Development Commands

```bash
npm run dev     # Start server with nodemon for auto-reloading
```

### Optional: Seed Products Data

```bash
npm run import:products  # Runs importProducts.js to populate products collection
```

---

## Production Commands

```bash
npm start       # Runs app in production mode (without nodemon)
```

---

## 🔌 API Endpoints

### Auth

- `POST /register` – Register new user
- `POST /login` – Login user and return token

### Products

- `GET /products` – Get all products
- `GET /products/:id` – Get product by ID

### Cart _(Protected Routes)_

- `GET /cart` – Get current user cart
- `POST /cart` – Add product to cart
- `PUT /cart/:productId` – Update cart item
- `DELETE /cart/:productId` – Remove item from cart

---

## Folder Structure

```
ShoppyGlobe_backend/
├── config/           # DB configuration
├── controllers/      # Route controllers
├── middleware/       # Custom middleware (auth, error handling)
├── models/           # Mongoose models
├── routes/           # Express route handlers
├── data/             # Dummy data for seeding
├── .env              # Environment variables
├── server.js         # Entry point
```

### NOTE: Seed Products Data into DataBase before Calling APIs

```bash
npm run import:products  # Runs importProducts.js to populate products collection
```

---

## 📬 Sample Request Body

Below are some example JSON payloads for making requests to various endpoints:

### 🔐 Register User

`POST /register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 🔐 Login User

`POST /login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 🛒 Add Product to Cart

`POST /cart`
(Requires Bearer Token)

```json
{
  "productId": "YOUR_PRODUCT_ID_HERE",
  "quantity": 2
}
```

### 🛒 Update Cart Item Quantity

`PUT /cart/:productId`
(Requires Bearer Token)

```json
{
  "quantity": 3
}
```

### ❌ Remove Product from Cart

`DELETE /cart/:productId`
(Requires Bearer Token)
(No body required)

### Create and Update products

`(POST/PUT) /products`
(body required)

```json
{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product details...",
  "stock": 10,
  "images": ["images"]
}
```
