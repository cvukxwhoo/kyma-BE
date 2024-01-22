import express from 'express';

// controllers
import categoryController from '../controllers/categoryController.js';

// middlewares
import { upload } from '../middlewares/upload.js';

// Controller

const categoryRouter = express.Router();

// Category
// POST
categoryRouter.post(
  '/',
  upload.single('image'),
  categoryController.createCategory
);

// GET ALL CATEGORY
categoryRouter.get('/', categoryController.getAllCategory);

// UPDATE CATEGORY BY ID
categoryRouter.put('/:id', categoryController.updateCategoryById);

export default categoryRouter;
