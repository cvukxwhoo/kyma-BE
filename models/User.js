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
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  Avatar: {
    type: String,
    require: true,
  },
  Role: {
    type: String,
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

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
