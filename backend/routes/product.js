import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addProduct,        // must match the actual function name
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

const router = express.Router();

// Correct route for adding product
router.post("/addproducts", authMiddleware, addProduct);

// Other routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
