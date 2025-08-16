import express from 'express';
import booksRouter from './bookRouter';

const apiRouter = express.Router();

apiRouter.use("/books", booksRouter);

export default apiRouter;