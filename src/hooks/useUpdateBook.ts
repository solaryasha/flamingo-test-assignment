import { useCallback } from 'react';
import { supabase } from "../../supabaseClient";
import type { ReadingStatus } from '../types';

export const useUpdateBook = (bookId: number, {
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const updateBook = useCallback(async ({
    title,
    author,
    status
  }: {
    title?: string;
    author?: string;
    status?: ReadingStatus;
  }) => {
    if (!bookId) return;
    const authData = await supabase.auth.getSession();
    const session = authData.data.session;
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'PATCH',
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
      const updatedBook = await response.json();
      if (!response.ok) {
        throw new Error(updatedBook.message || 'Failed to update book');
      }
      onSuccess();
      return updatedBook;
    } catch {
      onError();
      return false
    }
  }, []);

  return { updateBook };
}