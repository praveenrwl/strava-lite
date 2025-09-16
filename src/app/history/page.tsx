'use client';
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function HistoryPage() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch("/api/activities", {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });
      const data = await res.json();
      setActivities(data);
    }
    load();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Activities</h1>
      {activities.length === 0 ? (
        <p>No activities yet</p>
      ) : (
        <ul className="space-y-3">
          {activities.map(a => (
            <li key={a.id} className="p-3 border rounded">
              <div className="font-semibold">{a.title}</div>
              <div>{a.sport} • {a.date} • {a.durationmin} min</div>
              {a.distancekm && <div>{a.distancekm} km</div>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
