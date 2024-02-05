import express from "express";

// middlewares
import { upload } from "../middlewares/upload.js";

// Controller
import brandController from "../controllers/brandController.js";

const brandRouter = express.Router();

// PRODUCT

// CREATE
brandRouter.post(
  "/create",
  upload.single("image"),
  brandController.createBrand
);

// GET ALL BRAND
brandRouter.get("/", brandController.getAllBrand);

export default brandRouter;
