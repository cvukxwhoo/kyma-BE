import { format } from "date-fns";
import { StatusCodes } from "http-status-codes";
import CategoryModel from "../models/Category.js";
import PathCategoryModel from "../models/PathCategory.js";
import BrandModel from "../models/Brand.js";
import ProductModel from "../models/Product.js";

const productController = {
  // CREATE PRODUCT
  createProduct: async (req, res) => {
    try {
      const { categoryName, pathTitle, brandName, ...productData } = req.body;

      // Find the Category
      const category = await CategoryModel.findOne({ name: categoryName });
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Category with name ${categoryName} not found.`,
        });
      }

      // Find or create the PathCategory
      let pathCategory = await PathCategoryModel.findOne({
        title: pathTitle,
        byCategory: category._id,
      });

      if (!pathCategory) {
        // Create a new PathCategory if not found
        pathCategory = new PathCategoryModel({
          name: pathTitle,
          title: `Title for ${pathTitle}`, // Adjust accordingly
          byCategory: category._id,
        });
        await pathCategory.save();
        category.paths.push({
          id: pathCategory._id,
          name: pathCategory.name,
          title: pathCategory.title,
          products: [], // Initialize the products array
        });
        await category.save();
      }

      // Find or create the Brand
      let brand = await BrandModel.findOne({ name: brandName });
      if (!brand) {
        // Create a new Brand if not found
        brand = new BrandModel({
          name: brandName,
          image: "Image URL for brand", // Adjust accordingly
          products: [], // Initialize the products array
        });
        await brand.save();
      }

      // Create a new product and associate it with the PathCategory, Brand, and Category
      const newProduct = new ProductModel({
        ...productData,
        byPath: pathCategory._id,
        byCategory: category._id,
        byBrand: brand._id,
      });

      // Handle file upload
      if (req.file) {
        newProduct.image = req.file.path;
        newProduct.imageUrl = `http://localhost:3002/${req.file.path}`;
      }

      // Save the new product
      await newProduct.save();

      // Update the PathCategory to include the new product
      pathCategory.products.push(newProduct);
      await pathCategory.save();

      // Update the Brand to include the new product
      brand.products.push(newProduct);
      await brand.save();

      // Update the Category to include the new product
      category.paths.forEach((path) => {
        if (path.id.equals(pathCategory._id)) {
          path.products.push(newProduct);
        }
      });
      await category.save();

      res.status(StatusCodes.CREATED).json({
        message: `Product ${newProduct.name} created and associated with PathCategory ${pathTitle}, Brand ${brandName}, and Category ${categoryName}.`,
        data: newProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  // GET PRODUCT BY CATEGORY
  getProductsByCategory: async (req, res) => {
    try {
      const { categoryName } = req.params;

      // Find the Category
      const category = await CategoryModel.findOne({ name: categoryName });
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Category with name ${categoryName} not found.`,
        });
      }

      // Find products by category
      const products = await ProductModel.find({ byCategory: category._id });

      res.status(StatusCodes.OK).json({
        message: `Products found for Category ${categoryName}.`,
        data: products,
      });
    } catch (error) {
      console.error("Error getting products by category:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  getProductsByPath: async (req, res) => {
    try {
      const { pathName } = req.params;

      // Find the PathCategory
      const pathCategory = await PathCategoryModel.findOne({ name: pathName });
      if (!pathCategory) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `PathCategory with name ${pathName} not found.`,
        });
      }

      // Find products by path
      const products = await ProductModel.find({ byPath: pathCategory._id });

      res.status(StatusCodes.OK).json({
        message: `Products found for PathCategory ${pathName}.`,
        data: products,
      });
    } catch (error) {
      console.error("Error getting products by path:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  // GET PRODUCT DETAILS
  getProductById: async (req, res) => {
    try {
      // Extract product ID from request parameters
      const productId = req.params.productId;

      // Find the product by ID
      const product = await ProductModel.findById(productId).populate(
        "byBrand",
        "name -_id"
      );

      // Check if the product is found
      if (!product) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Product with ID ${productId} not found.`,
        });
      }

      // Return the product data
      res.status(StatusCodes.OK).json({
        message: `Product with ID ${productId} found.`,
        data: product,
      });
    } catch (error) {
      console.error("Error getting product by ID:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default productController;