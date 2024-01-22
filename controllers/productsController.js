import { ObjectId } from "mongodb";
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

  // EDIT
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

  // GET PRODUCT BY ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = req.body;
      const findProduct = await ProductSchema.findOne(
        {
          _id: id,
        },
        product
      ).populate("brands", "brandName -_id");
      if (findProduct) {
        res.status(StatusCodes.OK).json({
          message: "Get Product By ID Successfully",
          data: findProduct,
        });
        return;
      }
    } catch (error) {
      console.error("Error find product:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed to find product",
        error: error.message, // Include the error message in the response
      });
    }
  },

  // GET ALL PRODUCT BY ID CATEGORY
  getProductByIdCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const product = await ProductSchema.find({
        category: new ObjectId(categoryId),
      }).populate("category.category");

      if (product) {
        res.status(StatusCodes.OK).json({
          message: "Get Product By Category ID Successfully",
          data: product,
        });
        return;
      }
    } catch (error) {
      console.error("Error find product:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed To Find Product By Category ID ",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default productController;
