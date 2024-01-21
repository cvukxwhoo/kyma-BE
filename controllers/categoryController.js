import CategoryModel from "../models/Category.js";

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const createCategory = req.body;
      console.log(createCategory);
      //   Create products
      const newCategory = await CategoryModel.create(createCategory);
      res.status(201).json({
        message: "Create category successfully!",
        data: newCategory,
      });
    } catch (error) {
      console.error("Error uploading category:", error);
      res.status(400).json({
        message: "Failed to upload category",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default categoryController;
