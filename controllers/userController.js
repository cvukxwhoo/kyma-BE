import UserModel from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { createAccessToken } from "../utils/index.js";
import bcrypt from "bcrypt";
import CartModel from "../models/Cart.js";

const userController = {
  // CREATE NEW USER
  createNewUser: async (req, res) => {
    try {
      const { email, password, fullName, role } = req.body;

      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "User already exists with this email" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new UserModel({
        email,
        password: hashedPassword,
        fullName,
        role,
      });

      // Save the user to the database
      await newUser.save();

      // Create access token
      const token = createAccessToken(newUser);

      // Send response
      res.status(StatusCodes.CREATED).json({ token, userId: newUser._id });
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Server error" });
    }
  },

  // LOGIN
  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid username or password" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid username or password" });
      }

      // Create access token
      const token = createAccessToken(user);

      // Send response
      res.json({ token, userId: user._id });
    } catch (error) {
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Server error" });
    }
  },
};

export default userController;
