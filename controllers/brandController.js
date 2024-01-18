import BrandModel from "../models/Brand.js";

const brandController = {
  createBrand: async (req, res) => {
    try {
      const createBrand = req.body;
      console.log(req.body);
      //   Create products
      const newBrand = await BrandModel.create(createBrand);
      res.status(201).json({
        message: "Create brand successfully!",
        data: newBrand,
      });
    } catch (error) {
      console.error("Error uploading brand:", error);
      res.status(400).json({
        message: "Failed to upload brand",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default brandController;
