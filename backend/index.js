import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db.js";
import cors from "cors"; // <-- import cors

// Load environment variables
dotenv.config({ path: path.resolve("./.env") });

const app = express();

// ==========================
// MIDDLEWARE
// ==========================

// Enable JSON parsing
app.use(express.json());

// Enable CORS **before routes**
app.use(cors({
  origin: "http://localhost:3000" // frontend URL
}));

// ==========================
// CONNECT TO DATABASE
// ==========================
connectDB();

// ==========================
// ROUTES
// ==========================
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
