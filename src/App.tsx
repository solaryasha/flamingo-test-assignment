import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { type Session } from '@supabase/supabase-js';
import { Bookshelf } from './Bookshelf';
import { Toaster } from './ui/toaster';

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

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <button onClick={signUp}>Sign in with Google</button>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen">
        <Bookshelf />
        <Toaster />
      </div>
    );
  }
}

export default App;