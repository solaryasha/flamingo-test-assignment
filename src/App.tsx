import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "../supabaseClient";
import { type Session } from '@supabase/supabase-js';
import { Bookshelf } from './Bookshelf';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const addBook = async () => {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({
        title: 'Bible',
        author: 'God',
      })
    });

    await response.json();
  }

  const getBooks = async () => {
    const response = await fetch('/api/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      }
    });
    console.log(await response.json());
  };

  const updateBook = async () => {
    const bookId = 3;
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },

      body: JSON.stringify({
        title: 'Koran',
        status: 'READING'
      })
    });
    const updatedBook = await response.json();
    console.log('updatedBook:', updatedBook);
  };

  const deleteBook = async () => {
    const bookId = 2;
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      }
    });
    const result = await response.json();
    console.log('Delete result:', result);
  };

  if (!session) {
    return (
      <>
        <button onClick={signUp}>Sign in with Google</button>
      </>
    );
  } else {
    return (
      <Bookshelf />
    );
  }
}

export default App;