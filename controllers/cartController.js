import { StatusCodes } from 'http-status-codes';
import ProductModel from '../models/Product.js';
import CartModel from '../models/Cart.js';

const cartController = {
  addToCart: async (req, res) => {
    const { userId } = req.body;

    try {
      const cart = new CartModel({ userId, items: [] });
      await cart.save();

      res.status(201).json({ message: 'Cart created successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // GET /cart - Get the user's cart
  getCartContent: async (req, res) => {
    const userId = req.params.userId;

    try {
      const cart = await CartModel.findOne({ userId }).populate(
        'items.productId',
        'name price discountPrice'
      );

      if (cart) {
        res.status(200).json({ items: cart.items });
      } else {
        res.status(404).json({ error: 'Cart not found for the user.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default cartController;
