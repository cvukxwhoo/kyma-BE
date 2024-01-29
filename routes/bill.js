import express from "express";
import billController from "../controllers/billController.js";

// middlewares

// Controller

const billRouter = express.Router();

// PRODUCT

// CREATE
billRouter.post("/submit", billController.createBill);

export default billRouter;
