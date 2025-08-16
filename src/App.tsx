import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "../supabaseClient";
import { type Session } from '@supabase/supabase-js';

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

  if (!session) {
    return (
      <>
        <button onClick={signUp}>Sign in with Google</button>
      </>
    );
  } else {
    return (
      <div>
        <h2>Welcome, {session?.user?.email}</h2>
        <button onClick={addBook}>Add a book to reading list</button>
        <button onClick={getBooks}>Get books</button>
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }
}

export default App;