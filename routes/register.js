import express from "express";

// middlewares
import middlewares from "../middlewares/index.js";

// Controller
import registerController from "../controllers/registerController.js";

const registerRouter = express.Router();

// Register routes //

// POST
registerRouter.post(
  "/",
  middlewares.register,
  registerController.createNewUser
);

export default registerRouter;
