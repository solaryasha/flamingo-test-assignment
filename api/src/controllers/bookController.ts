import { Request, Response } from 'express';
import { ReadingStatus } from '../generated/prisma';
import prisma from '../services/db';

const addBook = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'title and author are required' });
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        status: ReadingStatus.TO_READ,
        userId: req.user.id
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error });
  }
};

const getBooks = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const books = await prisma.book.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const mappedBooks = books.map(({ id, title, author, status }) => ({
      id,
      title,
      author,
      status
    }));

    return res.status(200).json(mappedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error });
  }
}

const updateBook = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  const { bookId } = req.params;
  const { title, author, status } = req.body;
  try {
    const updatedBook = await prisma.book.update({
      where: { id: Number(bookId), userId: req.user.id },
      data: {
        title,
        author,
        status,
      },
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log('error while updating book book:', error);
    res.status(500).json({ message: 'Failed to update book', error });        
  }
};

const deleteBook = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  const { bookId } = req.params;
  try {
    await prisma.book.delete({
      where: { id: Number(bookId), userId: req.user.id },
    });
    res.status(200).json({ message: `Book ${bookId} deleted` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
}

export default {
  addBook,
  getBooks,
  updateBook,
  deleteBook
}