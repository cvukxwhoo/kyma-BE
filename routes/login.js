import express from "express";

// middlewares
import middlewares from "../middlewares/index.js";

// Controller
import loginController from "../controllers/loginController.js";

const loginRouter = express.Router();

// Register routes //

// POST
loginRouter.post("/", middlewares.login, loginController.postLogin);

export default loginRouter;
