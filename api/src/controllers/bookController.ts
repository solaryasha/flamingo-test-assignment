import { Request, Response } from 'express';
import { ReadingStatus } from '../generated/prisma';
import { supabase } from '../services/supabase';
import prisma from '../services/db';

const addBook = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  const getUserResponse = await supabase.auth.getUser(token);
  if (!getUserResponse.data?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
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
        userId: getUserResponse.data.user.id,
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create book', error });
  }
};


export default {
  addBook
}