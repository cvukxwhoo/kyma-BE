import { StatusCodes } from 'http-status-codes';
import ProductModel from '../models/Product.js';
import CartModel from '../models/Cart.js';

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { productId, quanities } = req.body;
      const existingCart = await CartModel.findOne();

      if (existingCart) {
        // If the cart exists, update the quanities  of the existing item or add a new item
        const existingItem = existingCart.items.find(
          (item) => item.productId == productId
        );

        if (existingItem !== -1) {
          existingCart.items[existingItem].quanities += quanities || 1;
        } else {
          // Fetch additional information about the product
          const productInfo = await ProductModel.findById(productId);

          if (!productInfo) {
            return res.status(404).json({ error: 'Product not found' });
          }

          const newItem = {
            productId: productInfo._id,
            quanities: quanities || 1,
            title: productInfo.title,
            price: productInfo.price,
            discountPrice: productInfo.discountPrice,
            imageUrl: productInfo.imageUrl,
          };

          // Push the new item to the existing cart
          existingCart.items.push(newItem);
        }

        await existingCart.save();
        res.status(200).json({
          message: 'Item added to cart successfully',
          data: existingCart.items,
        });
      } else {
        // If the cart doesn't exist, create a new one with the new item
        const newCart = new CartModel({
          items: [
            {
              productId,
              quanities: quanities || 1,
              // Fetch additional information about the product
              ...(await ProductModel.findById(
                productId,
                'title price discountPrice imageUrl'
              )),
            },
          ],
        });

        await newCart.save();
        res.status(201).json({
          message: 'Cart created successfully',
          data: newCart.items,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // GET /cart - Get the user's cart
  getAllCarts: async (req, res) => {
    try {
      const allCarts = await CartModel.find({}).populate(
        'items.productId',
        'title price discountPrice imageUrl'
      );

      res.status(200).json({ carts: allCarts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default cartController;
