import { useCallback } from 'react';
import { supabase } from "../../supabaseClient";
import type { ReadingStatus } from '../types';

export const useAddBook = () => {
  const addBook = useCallback(async ({
    title,
    author,
    status
  }: {
    title: string;
    author: string;
    status: ReadingStatus;
  }) => {
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

    const newBook = await response.json();
    return newBook;
  }, []);

  return { addBook };
}