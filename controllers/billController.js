import { StatusCodes } from "http-status-codes";
import BillModel from "../models/Bill.js";
import UserModel from "../models/User.js";
import ProductModel from "../models/Product.js";

const billController = {
  createBill: async (req, res) => {
    try {
      const { formData, userId, products } = req.body;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "User not found" });
      }

      // const products = product.map((productData) => ({
      //   product: productData.productId,
      //   quanities: productData.quanities,
      //   title: productData.title,
      //   price: productData.price,
      // }));

      for (const productData of products) {
        const { productId, quanities, title, price, discountPrice } =
          productData;

        // Find the product by ID
        const product = await ProductModel.findById(productId);
        if (!product) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: `Product with ID ${productId} not found` });
        }

        // Update the quantity of the product
        product.quanities -= quanities;

        // Save the updated product
        await product.save();
      }

      const newOrder = new BillModel({
        formData,
        user,
        products,
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();
      console.log(savedOrder);

      res.status(StatusCodes.CREATED).json(savedOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },
};

export default billController;
