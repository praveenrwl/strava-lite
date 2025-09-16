'use client';
import { useEffect, useState } from 'react';import { supabase } from '../../lib/supabaseClient';


export default function UserMenu() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // initial fetch
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // subscribe to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
      <img
        src={user.user_metadata?.avatar_url || '/vercel.svg'}
        alt="avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="text-sm">{user.email}</div>
      <button
        onClick={signOut}
        className="ml-3 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign out
      </button>
    </div>
  );
}
