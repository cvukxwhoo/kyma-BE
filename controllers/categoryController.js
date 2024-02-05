import { createAccessToken } from "../utils/index.js";
import CategoryModel from "../models/Category.js";
import { StatusCodes } from "http-status-codes";
import PathCategoryModel from "../models/PathCategory.js";

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
        message: "Post Category Successfully!",
        data: savedProduct,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed to upload category",
        error: error.message, // Include the error message in the response
      });
    }
  },

  // CREATE PATH IN CATEGORY
  createPathInCategory: async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
      const { name, title } = req.body; // Assuming you send the name and title in the request body

      // Find the category document based on the name
      const category = await CategoryModel.findOne({ name: categoryName });

      if (!category) {
        // Handle case where the category does not exist
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Category with name ${categoryName} not found.`,
        });
      }

      // Create a new path and associate it with the category
      const newPath = new PathCategoryModel({
        name,
        title,
        byCategory: category._id,
      });

      // Save the new path
      await newPath.save();

      // Update the category to include the new path information
      category.paths.push({
        id: newPath._id,
        name: newPath.name,
        title: newPath.title,
      });
      await category.save();

      res.status(StatusCodes.CREATED).json({
        message: `Path ${name} created and associated with category ${categoryName}.`,
        data: newPath,
      });
    } catch (error) {
      console.error("Error creating path:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  // GET ALL CATEGORY
  getAllCategory: async (req, res) => {
    try {
      const allCategory = await CategoryModel.find();
      res.status(StatusCodes.OK).json({
        message: "Get Category Successful",
        data: allCategory,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed to get category",
        error: error.message, // Include the error message in the response
      });
    }
  },

  // GET CATEGORY BY NAME
  getCategoryByName: async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
      const category = await CategoryModel.findOne({ name: categoryName });
      res.status(StatusCodes.OK).json({
        message: "Get Paths Successfully!",
        data: category,
      });
    } catch (error) {
      console.error("Error getting category by name", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  // GET PATH BY NAME OF CATEGORY
  getPathsByCategoryName: async (req, res) => {
    try {
      const categoryName = req.params.categoryName;

      // Find the category document based on the name
      const category = await CategoryModel.findOne({ name: categoryName });

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Category with name ${categoryName} not found.`,
        });
      }

      // Find the paths associated with the specified category ObjectId
      const paths = await PathCategoryModel.find({
        byCategory: category._id,
      });

      res.status(StatusCodes.OK).json({
        message: `Get Paths for Category ${categoryName} Successfully!`,
        data: paths,
      });
    } catch (error) {
      console.error("Error getting paths by category name:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  // GET PATH BY NAME OF CATEGORY
  getPathsByCategoryId: async (req, res) => {
    try {
      const { categoryId } = req.params;

      // Find the category document based on the name
      const category = await CategoryModel.findOne({ _id: categoryId });

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Category with name ${categoryId} not found.`,
        });
      }

      // Find the paths associated with the specified category ObjectId
      const paths = await PathCategoryModel.find({
        byCategory: category._id,
      });

      res.status(StatusCodes.OK).json({
        message: `Get Paths for Category ${categoryId} Successfully!`,
        data: paths,
      });
    } catch (error) {
      console.error("Error getting paths by category name:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default categoryController;
