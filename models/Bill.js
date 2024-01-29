import { format } from "date-fns";
import mongoose from "mongoose";

const BillSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  invoice: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: false,
  },
  taxCode: {
    type: String,
    require: false,
  },
  addressCompany: {
    type: String,
    require: false,
  },
  textareaContent: {
    type: String,
    require: false,
  },

  createdAt: {
    type: String,
    default: format(new Date(), "MMM dd, yyyy"),
  },
});

const BillModel = mongoose.model("bills", BillSchema);

export default BillModel;
