import { StatusCodes } from 'http-status-codes';
import BillModel from '../models/Bill.js';
import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';

const billController = {
  createBill: async (req, res) => {
    try {
      const { formData, userId, product } = req.body;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'User not found' });
      }
      // Save each product to the Product model      // Map the product data to the required format
      const products = product.map((productData) => ({
        product: productData.productId,
        quanities: productData.quanities,
        title: productData.title,
        price: productData.price,
      }));

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
      console.error('Error creating order:', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  },
};

export default billController;
