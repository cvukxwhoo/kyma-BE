import UserModel from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const registerController = {
  createNewUser: async (req, res) => {
    try {
      const newUser = req.body;
      //   Create User
      const createNewUser = await UserModel.create(newUser);
      if (createNewUser) {
        res.status(StatusCodes.CREATED).json({
          message: "User created successfully!",
          data: createNewUser,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "User created unsuccessful!",
          data: createNewUser,
        });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },
};

export default registerController;
