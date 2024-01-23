import express from "express";

// controllers
import categoryController from "../controllers/categoryController.js";

// middlewares
import { upload } from "../middlewares/upload.js";

// Controller

const categoryRouter = express.Router();

// CREATE CATEGORY
categoryRouter.post(
  "/",
  upload.single("image"),
  categoryController.createCategory
);

// CREATE PATH IN CATEGORY
categoryRouter.post(
  "/:categoryName/create-path",
  categoryController.createPathInCategory
);

// GET ALL CATEGORY
categoryRouter.get("/", categoryController.getAllCategory);

// GET CATEGORY BY NAME
categoryRouter.get("/:categoryName", categoryController.getCategoryByName);

// GET ALL PATH BY NAME CATEGORY
categoryRouter.get(
  "/:categoryName/paths",
  categoryController.getPathsByCategoryName
);

export default categoryRouter;
