import { format } from "date-fns";
import mongoose from "mongoose";

const BillSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    email: String,
    fullName: String,
  },
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
    enum: ["company", "individual"],
    require: true,
  },
  note: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending",
  },
  createdAt: {
    type: String,
    default: format(new Date(), "MMM dd, yyyy"),
  },
});

const BillModel = mongoose.model("bills", BillSchema);

export default BillModel;
