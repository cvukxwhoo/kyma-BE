import { createAccessToken } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';
import PathCategoryModel from '../models/PathCategory.js';

const pathController = {
  // Create Category
  createPath: async (req, res) => {
    try {
      const createPath = req.body;
      console.log(createPath);

      //   Create Path
      const newPath = await PathCategoryModel.create(createPath);

      res.status(StatusCodes.CREATED).json({
        message: 'Post Path Successfully!',
        data: newPath,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Failed to upload path',
        error: error.message, // Include the error message in the response
      });
    }
  },
};

export default pathController;
