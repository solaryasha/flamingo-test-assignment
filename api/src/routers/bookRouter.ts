import express from 'express';
import bookController from '../controllers/bookController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const booksRouter = express.Router();

booksRouter.post('/', isAuthenticated, bookController.addBook);

booksRouter.get('/', isAuthenticated, bookController.getBooks);

booksRouter.patch('/:bookId', isAuthenticated, bookController.updateBook);

booksRouter.delete('/:bookId', isAuthenticated, bookController.deleteBook);

export default booksRouter;