import UserModel from "../models/User.js";

const registerController = {
  createNewUser: async (req, res) => {
    try {
      const newUser = req.body;
      //   Create User
      const createNewUser = await UserModel.create(newUser);
      res.status(201).json({
        message: "User created successfully!",
        data: createNewUser,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default registerController;
