import { StatusCodes } from "http-status-codes";
import BillModel from "../models/Bill.js";

const billController = {
  createBill: async (req, res) => {
    try {
      const createBill = req.body;

      //   Create Brands
      const newBill = await BillModel.create(createBill);
      // Save the new product to the database
      const saveBill = await newBill.save();
      res.status(StatusCodes.CREATED).json({
        message: "Submit bill successfully!",
        data: saveBill,
      });
    } catch (error) {
      console.error("Error submit bill:", error);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Error sibmit bill",
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default billController;
