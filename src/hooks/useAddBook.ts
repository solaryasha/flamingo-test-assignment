import { useCallback } from 'react';
import { supabase } from "../../supabaseClient";
import type { Book, ReadingStatus } from '../types';

interface AddBookParams {
  title: string;
  author: string;
  status: ReadingStatus;
}

interface RequestOptions {
  onSuccess: (book: Book) => void;
  onError: () => void;
}

export const useAddBook = ({
  onSuccess = () => { },
  onError = () => { },
}: RequestOptions
) => {
  const addBook = useCallback(async ({
    title,
    author,
    status
  }: AddBookParams
  ) => {
    const authData = await supabase.auth.getSession();
    const session = authData.data.session;
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({
        title,
        author,
        status
      })
    });
    try {
      const newBook = await response.json();
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      console.log('onSuccess called');
      onSuccess(newBook);
      return newBook;
    } catch {
      onError();
      return null;
    }
  }, []);

  return { addBook };
}