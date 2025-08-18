import { useCallback } from 'react';
import { supabase } from "../../supabaseClient";

export const useDeleteBook = (bookId: number, {
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const deleteBook = useCallback(async () => {
    const authData = await supabase.auth.getSession();
    const session = authData.data.session;
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      }
    });
    try {
      await response.json();
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      onSuccess();
      return true;
    } catch {
      onError();
      return false
    }
  }, []);

  return { deleteBook };
}