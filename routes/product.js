import express from "express";

// middlewares
import { upload } from "../middlewares/upload.js";

// Controller
import productController from "../controllers/productsController.js";

const productRouter = express.Router();

// PRODUCT
// GET
productRouter.get(
  "/:categoryId",
  upload.single("image"),
  productController.getProductByIdCategory
);

// GET Details Product BY ID
productRouter.get(
  "/details/:id",
  upload.single("image"),
  productController.getProductById
);

// CREATE
productRouter.post("/", upload.single("image"), productController.postProduct);

// PUT
productRouter.put(
  "/:id",
  upload.single("image"),
  productController.editProduct
);

export default productRouter;
