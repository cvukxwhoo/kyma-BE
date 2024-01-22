import express from 'express';
import pathController from '../controllers/pathController.js';

// middlewares

// Controller

const pathRouter = express.Router();

// Path
// POST
pathRouter.post('/', pathController.createPath);

export default pathRouter;
