import express from "express";

// middlewares

// Controller
import userController from "../controllers/userController.js";
import middlewares from "../middlewares/index.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  middlewares.register,
  userController.createNewUser
);

userRouter.post("/login", middlewares.login, userController.postLogin);

export default userRouter;