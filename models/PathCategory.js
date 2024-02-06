import { format } from "date-fns";
import mongoose from "mongoose";

const PathCategorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  byCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    require: true,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      name: String,
      title: String,
      price: Number,
      discountPrice: Number,
      warrantyPeriod: Number,
      origin: String,
      quanities: Number,
      code: String,
      image: String,
      imageUrl: String,
      isActive: Boolean,
      createdAt: String,
      updatedAt: String,
      features: Array,
    },
  ],
  createdAt: {
    type: String,
    default: format(new Date(), "MMM dd, yyyy"),
  },
  updatedAt: {
    type: String,
    default: format(new Date(), "MMM dd, yyyy"),
  },
});

const PathCategoryModel = mongoose.model("paths", PathCategorySchema);

export default PathCategoryModel;
