import { format } from "date-fns";
import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", // Assuming you have a Product model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: String,
    default: format(new Date(), "MMM dd, yyyy"),
  },
});

const CartModel = mongoose.model("carts", CartSchema);

export default CartModel;
