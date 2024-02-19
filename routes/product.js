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

// GET ALL PRODUCT
productRouter.get("/", productController.getAllProduct);

// GET PRODUCT BY NAME
productRouter.get("/:categoryName", productController.getProductsByCategory);

// GETPRODUCT BY PATH
productRouter.get("/path/:pathName", productController.getProductsByPath);

// GET PRODUCT BY ID
productRouter.get("/details/:productId", productController.getProductById);

//  EDIT PRODUCT BY ID
productRouter.put("/:productId", productController.editProduct);

// SEARCH NAME OF PRODUCTS
productRouter.get("api/search", productController.searchProduct);

// DELETE PRODUCT BY ID
productRouter.delete("/:productId", productController.deleteProduct);

export default productRouter;
