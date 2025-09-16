'use client';
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";  // 👈 client instance import

export default function AddActivityPage() {
  const [form, setForm] = useState({
    sport: "Run",
    title: "",
    date: "",
    durationMin: "",
    distanceKm: "",
    effort: "",
    notes: "",
  });
  const [msg, setMsg] = useState("");

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    // 🔑 Supabase se token lena
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      setMsg("❌ Please login first");
      return;
    }

    // API ko call karo with Bearer token
    const res = await fetch("/api/activities", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,   // ✅ token added here
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) setMsg("✅ Activity saved!");
    else setMsg("❌ Error: " + data.error);
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Add Activity</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select name="sport" value={form.sport} onChange={handleChange}>
          <option>Run</option>
          <option>Ride</option>
        </select>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="number" name="durationMin" placeholder="Duration (min)" value={form.durationMin} onChange={handleChange} required />
        <input type="number" name="distanceKm" placeholder="Distance (km)" value={form.distanceKm} onChange={handleChange} />
        <input type="number" name="effort" placeholder="Effort (1-10)" value={form.effort} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </form>
      <p className="mt-2">{msg}</p>
    </main>
  );
}
