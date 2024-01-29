import { format } from "date-fns";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products", // Reference to the Product model if applicable
      },
      title: String,
      price: Number,
      discountPrice: Number,
      imageUrl: String,
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  bill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bills", // Reference to the Bill model
  },
});

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;
