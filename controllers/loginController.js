import UserModel from "../models/User.js";
import { createAccessToken } from "../utils/index.js";

const loginController = {
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

export default loginController;
