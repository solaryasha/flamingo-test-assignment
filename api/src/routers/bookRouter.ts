import express from 'express';
import bookController from '../controllers/bookController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const booksRouter = express.Router();

booksRouter.post('/', isAuthenticated, bookController.addBook);

booksRouter.get('/', isAuthenticated, bookController.getBooks);

// Update an existing book
booksRouter.patch('/:bookId', (req, res) => {
  const { bookId } = req.params;
  // Logic to update a book
  res.send({ message: `Book ${bookId} updated` });
});

// Delete a book
booksRouter.delete('/:bookId', (req, res) => {
  const { bookId } = req.params;
  // Logic to delete a book
  res.send({ message: `Book ${bookId} deleted` });
});

export default booksRouter;