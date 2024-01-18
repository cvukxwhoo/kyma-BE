import ProductSchema from "../models/Product.js";

const productController = {
  postProduct: async (req, res) => {
    try {
      const createProduct = req.body;
      //   Create products
      const newProduct = await ProductSchema.create(createProduct);

      if (req.file) {
        newProduct.image = req.file.path;
      }

      res.status(200).json({
        message: "Post product successfully!",
        data: newProduct,
      });
    } catch (error) {
      console.error("Error uploading item:", error);
      res.status(400).json({
        message: "Failed to upload item",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default productController;
