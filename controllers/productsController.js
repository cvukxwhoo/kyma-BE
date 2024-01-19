import ProductSchema from "../models/Product.js";
import { StatusCodes } from "http-status-codes";

const productController = {
  // GET ALL
  getAllProduct: async (req, res) => {
    try {
      const product = req.body;
      const allProduct = await ProductSchema.find(product);
      if (req.file) {
        allProduct.image = req.file.path;
      }
      res.status(StatusCodes.OK).json({
        message: "Get all product successfully!",
        data: allProduct,
      });
    } catch (error) {
      console.error("Error uploading item:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed to upload item",
        error: error.message, // Include the error message in the response
      });
    }
  },

  // CREATE
  postProduct: async (req, res) => {
    try {
      const createProduct = req.body;

      if (req.file) {
        createProduct.image = req.file.path;
        createProduct.imageUrl = `http://localhost:3002/${req.file.path}`;
      }

      //   Create products
      const newProduct = await ProductSchema.create(createProduct);

      // Save the new product to the database
      const savedProduct = await newProduct.save();

      res.status(StatusCodes.CREATED).json({
        message: "Post product successfully!",
        data: savedProduct,
      });
    } catch (error) {
      console.error("Error uploading item:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed to upload item",
        error: error.message, // Include the error message in the response
      });
    }
  },

  editProduct: async (req, res) => {
    try {
      const { id } = req.params;
      //   Create products
      const newProduct = await ProductSchema.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );

      if (req.file) {
        newProduct.image = req.file.path;
      }

      res.status(200).json({
        message: "Edit product successfully!",
        data: newProduct,
      });
    } catch (error) {
      console.error("Error edit product item:", error);
      res.status(400).json({
        message: "Failed to upload item",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default productController;
