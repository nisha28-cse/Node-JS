
E-COMMERCE/
│
├── backend/                  → Backend (Node.js + Express + MongoDB)
│   ├── controllers/           → Contains business logic for routes
│   │   ├── product.js         → Handles product creation, update, delete, and fetch
│   │   └── user.js            → Handles user registration, login, and OTP verification
│   │
│   ├── database/              → Database connection setup
│   │   └── db.js
│   │
│   ├── middleware/            → Middleware (e.g., authentication)
│   │   └── authMiddleware.js
│   │
│   ├── models/                → Mongoose models for MongoDB collections
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/                → API route definitions
│   │   ├── product.js
│   │   └── user.js
│   │
│   ├── .env                   → Environment variables (DB, Secrets, Email Config)
│   ├── index.js               → Main entry point for backend server
│   ├── package.json           → Backend dependencies
│   └── package-lock.json
│
├── frontend/ecommerce-frontend/  → Frontend (React.js)
│   ├── public/                   → Static files and HTML template
│   ├── src/                      → Source code for React
│   │   ├── pages/                → Page components (e.g., Home, Products, Cart)
│   │   ├── App.js                → Root React component
│   │   ├── config.js             → Frontend API configuration
│   │   ├── index.js              → Entry point for React
│   │   ├── index.css             → Custom CSS and styling
│   │   └── App.css               → Component-level styles
│   │
│   ├── package.json              → Frontend dependencies
│   └── README.md                 → Frontend documentation
│
└── README.md    
