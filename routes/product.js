import express from "express";

// middlewares
import { upload } from "../middlewares/upload.js";
import productController from "../controllers/productController.js";

// Controller

const productRouter = express.Router();

// PRODUCT

// CREATE
productRouter.post(
  "/create",
  upload.single("image"),
  productController.createProduct
);

// GET PRODUCT BY NAME
productRouter.get("/:categoryName", productController.getProductsByCategory);

// GETPRODUCT BY PATH
productRouter.get("/path/:pathName", productController.getProductsByPath);

// GET PRODUCT BY ID

productRouter.get("/details/:productId", productController.getProductById);

export default productRouter;
