import express from "express";

// middlewares

// Controller
import cartController from "../controllers/cartController.js";

const cartRouter = express.Router();

// PRODUCT

// CREATE
cartRouter.post("/create", cartController.addToCart);

// GET
cartRouter.get("/getCart", cartController.getAllCarts);

export default cartRouter;
