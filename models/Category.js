import { format } from "date-fns";
import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  category: {
    type: String,
    require: true,
    unique: true,
  },
  brands: { type: mongoose.Schema.Types.ObjectId, ref: "brands" },
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
