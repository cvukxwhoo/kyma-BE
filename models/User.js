import { format } from "date-fns";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  bill: [
    {
      billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bills",
      },
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

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
