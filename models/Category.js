import { format } from "date-fns";
import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // Fix the typo from "require" to "required"
    unique: true,
  },
  title: {
    type: String,
    required: true, // Fix the typo from "require" to "required"
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  paths: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "paths",
      },
      name: String,
      title: String,
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
          image: String,
          imageUrl: String,
          isActive: Boolean,
        },
      ],
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

const CategoryModel = mongoose.model("categories", CategorySchema);

export default CategoryModel;
