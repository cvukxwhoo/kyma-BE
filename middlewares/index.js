import UserModel from "../models/User.js";

const middlewares = {
  register: async (req, res, next) => {
    const { email, password, firstName, lastName, Avatar, Role } = req.body;
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({
        message: "Please provide information",
      });
      return;
    }
    try {
      const existedEmail = await UserModel.findOne({ email });
      //   Check Email existed
      if (existedEmail) {
        res.status(400).json({
          message: "Email has been existed!",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }
    next();
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email or password",
      });
      return;
    }
    next();
  },
};

export default middlewares;
