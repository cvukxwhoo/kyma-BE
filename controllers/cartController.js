import { StatusCodes } from "http-status-codes";
import ProductModel from "../models/Product.js";
import CartModel from "../models/Cart.js";

const cartController = {
  addToCart: async (req, res) => {
    const { productId, quantity } = req.body;

    try {
      // Check if the product exists
      const product = await ProductModel.findById(productId);

      if (!product) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Product not found" });
      }

      // Check if the product is already in the cart
      let existingCartItem = await CartModel.findOne({ productId });

      if (existingCartItem) {
        // If the product is in the cart, increase the quantity
        existingCartItem.quantity += quantity || 1;
        await existingCartItem.save();

        // Fetch additional details from the ProductModel
        const { name, price, discountPrice, imageUrl } = product;

        res.status(StatusCodes.OK).json({
          message: "Product added to cart successfully",
          cartItem: {
            productId: existingCartItem.productId,
            quantity: existingCartItem.quantity,
            name,
            price,
            discountPrice,
            imageUrl,
          },
        });
      } else {
        // If the product is not in the cart, add it
        const newCartItem = new CartModel({
          productId,
          quantity: quantity || 1,
        });
        await newCartItem.save();

        res.status(StatusCodes.OK).json({
          message: "Product added to cart successfully",
          cartItem: {
            productId: newCartItem.productId,
            quantity: newCartItem.quantity,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            imageUrl: product.imageUrl,
          },
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  getAllCartItems: async (req, res) => {
    try {
      const allCartItems = await CartModel.find();

      res.status(StatusCodes.OK).json({
        message: "All cart items retrieved successfully",
        data: allCartItems,
      });
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },
};

export default cartController;
