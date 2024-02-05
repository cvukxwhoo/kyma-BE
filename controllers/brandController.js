import { StatusCodes } from "http-status-codes";
import BrandModel from "../models/Brand.js";

const brandController = {
  createBrand: async (req, res) => {
    try {
      const createBrand = req.body;

      if (req.file) {
        createBrand.image = req.file.path;
        createBrand.imageUrl = `http://localhost:3002/${req.file.path}`;
      }
      //   Create Brands
      const newBrand = await BrandModel.create(createBrand);
      // Save the new product to the database
      const savedBrand = await newBrand.save();
      res.status(StatusCodes.CREATED).json({
        message: "Create brand successfully!",
        data: savedBrand,
      });
    } catch (error) {
      console.error("Error uploading brand:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Failed to upload brand",
        error: error.message, // Include the error message in the response
      });
    }
  },

  getAllBrand: async (req, res) => {
    try {
      const allBrand = await BrandModel.find();

      res.status(StatusCodes.OK).json({
        message: "Find All Brand Successfully",
        data: allBrand,
      });
    } catch (error) {
      console.error("Error find brand:", error);
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Failed to find brand",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default brandController;
