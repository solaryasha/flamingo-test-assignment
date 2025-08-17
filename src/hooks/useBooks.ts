import { useEffect, useState } from 'react';
import { supabase } from "../../supabaseClient";
import type { Book } from '../types';
export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const authData = await supabase.auth.getSession();
      const session = authData.data.session;
      const response = await fetch('/api/books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      try {
        const result = await response.json();
        setBooks(result);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [])

  return books;
}