import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, status, userId } = req.body;
    if (!title || !author || !userId) {
      return res.status(400).json({ message: 'title, author, and userId are required' });
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        status,
        userId,
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error });
  }
};