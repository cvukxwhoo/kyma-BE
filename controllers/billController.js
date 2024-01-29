import { StatusCodes } from 'http-status-codes';
import BillModel from '../models/Bill.js';
import UserModel from '../models/User.js';
import ProductModel from '../models/Product.js';

const billController = {
  createBill: async (req, res) => {
    try {
      const { formData, productIds } = req.body;

      // Find the user and products using their IDs

      const userId = req.cookies.userId;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'User not found' });
      }

      // Create an array of product objects with quantity
      const orders = productIds.map((productId) => ({
        product: productId,
        quantity: 1, // Set the default quantity, you can adjust as needed
      }));

      // Create a new order using the Order model and populate the user and products fields
      const newOrder = new BillModel({
        formData,
        user,
        orders,
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();

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
