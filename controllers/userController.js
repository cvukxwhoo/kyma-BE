import UserModel from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { createAccessToken } from "../utils/index.js";

const userController = {
  // CREATE NEW USER
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

  // LOGIN
  postLogin: async (req, res) => {
    try {
      const userLogin = req.body;
      //   Create User
      const postLogin = await UserModel.findOne(userLogin);
      if (postLogin) {
        res.status(200).json({
          message: "User login successfully!",
          data: postLogin ? createAccessToken(postLogin) : postLogin,
        });
      } else {
        res.status(400).json({
          message: "Email or password not correct",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default userController;
