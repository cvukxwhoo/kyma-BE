import { format } from "date-fns";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  quanities: {
    type: Number,
    require: true,
  },
  brands: { type: mongoose.Schema.Types.ObjectId, ref: "brands" },
  category: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  image: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  createdAt: {
    type: String,
    default: format(new Date(), "MMM dd, yyyy"),
  },
  updatedAt: {
    type: String,
    default: format(new Date(), "MMM dd, yyyy"),
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
