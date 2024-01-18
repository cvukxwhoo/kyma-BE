import express from "express";
import brandController from "../controllers/brandController.js";

// middlewares

// Controller

const brandRouter = express.Router();

// PRODUCT
// POST
brandRouter.post("/", brandController.createBrand);

export default brandRouter;
