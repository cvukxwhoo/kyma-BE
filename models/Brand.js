import { format } from "date-fns";
import mongoose from "mongoose";

const BrandSchema = mongoose.Schema({
  brandName: {
    type: String,
    require: true,
    unique: true,
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

const BrandModel = mongoose.model("brands", BrandSchema);

export default BrandModel;
