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

// GET ALL USER
userRouter.get("/", userController.getAllUser);

// FIND AN USER
userRouter.get("/id/:userId", userController.findUser);

export default userRouter;
