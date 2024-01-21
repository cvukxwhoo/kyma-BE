import express from "express";
import categoryController from "../controllers/categoryController.js";

// controllers

// middlewares

// Controller

const categoryRouter = express.Router();

// Category
// POST
categoryRouter.post("/", categoryController.createCategory);

export default categoryRouter;
