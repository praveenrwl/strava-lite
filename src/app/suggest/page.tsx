'use client';
import { useState } from "react";

export default function SuggestPage() {
  const [res, setRes] = useState<any>(null);

  async function getSuggestion() {
    const res = await fetch("/api/suggest", {
        method: "POST",   // ✅ force POST
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // agar kuch bhejna ho future me
    });

    const data = await res.json();
    console.log("AI Suggestion:", data);
    alert(data.suggestion); // ya UI me show karo
    }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">AI Suggestion</h1>
      <button
        onClick={getSuggestion}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Get Today’s Suggestion
      </button>
      {res && (
        <div className="mt-4 p-3 border rounded">
          <p className="font-semibold">{res.suggestion}</p>
          <p className="text-sm text-gray-600">{res.rationale}</p>
        </div>
      )}
    </main>
  );
}
