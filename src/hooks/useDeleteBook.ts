import { useCallback } from 'react';
import { supabase } from "../../supabaseClient";

export const useDeleteBook = (bookId: number) => {
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
    await response.json();
  }, []);

  return { deleteBook };
}