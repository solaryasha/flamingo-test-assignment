import express from 'express';
import bookController from '../controllers/bookController';

const booksRouter = express.Router();

// Add a new book
booksRouter.post('/', bookController.addBook);

// Get all of the user's books
booksRouter.get('/', (req, res) => {
  // Logic to get all books
  res.send([{ id: 1, title: 'Book 1' }]);
});

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