import express from "express";

// middlewares
import { upload } from "../middlewares/upload.js";

// Controller
import productController from "../controllers/productsController.js";

const productRouter = express.Router();

// PRODUCT
// POST
productRouter.post("/", upload.single("image"), productController.postProduct);

export default productRouter;
