import { createAccessToken } from '../utils/index.js';
import CategoryModel from '../models/Category.js';
import { StatusCodes } from 'http-status-codes';

const categoryController = {
  // Create Category
  createCategory: async (req, res) => {
    try {
      const createCategory = req.body;

      if (req.file) {
        createCategory.image = req.file.path;
        createCategory.imageUrl = `http://localhost:3002/${req.file.path}`;
      }
      //   Create Category
      const newCategory = await CategoryModel.create(createCategory);
      // Save the new product to the database
      const savedProduct = await newCategory.save();
      res.status(StatusCodes.CREATED).json({
        message: 'Post Category Successfully!',
        data: savedProduct,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Failed to upload category',
        error: error.message, // Include the error message in the response
      });
    }
  },

  // GET ALL CATEGORY
  getAllCategory: async (req, res) => {
    try {
      const allCategory = await CategoryModel.find();
      res.status(StatusCodes.OK).json({
        message: 'Get Category Successful',
        data: allCategory,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Failed to get category',
        error: error.message, // Include the error message in the response
      });
    }
  },

  // PUT CATEGORY BY ID
  updateCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const updateCategoryById = await CategoryModel.findOneAndUpdate(
        {
          _id: id,
        },
        $set(req.body),
        { new: true }
      );
      if (updateCategoryById) {
        return res.status(StatusCodes.OK).json({
          message: 'Category updated successfully',
          data: updateCategoryById,
        });
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Category not found',
        });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to update category',
        error: error.message,
      });
    }
  },
};

export default categoryController;
