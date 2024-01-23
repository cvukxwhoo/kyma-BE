import express from 'express';

// middlewares
import { upload } from '../middlewares/upload.js';
import productController from '../controllers/productController.js';

// Controller

const productRouter = express.Router();

// PRODUCT

// CREATE
productRouter.post(
  '/create',
  upload.single('image'),
  productController.createProduct
);

export default productRouter;
