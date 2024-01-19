import express from "express";

// middlewares
import { upload } from "../middlewares/upload.js";

// Controller
import productController from "../controllers/productsController.js";

const productRouter = express.Router();

// PRODUCT
// GET
productRouter.get("/", upload.single("image"), productController.getAllProduct);

// CREATE
productRouter.post("/", upload.single("image"), productController.postProduct);

// PUT
productRouter.put(
  "/:id",
  upload.single("image"),
  productController.editProduct
);

export default productRouter;
