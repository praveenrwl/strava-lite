import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST() {
  try {
    // 🔹 Last 28 days ke activities Supabase se lao
    const since = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();
    const { data: history, error } = await supabase
      .from("activities")
      .select("sport, title, date, duration_min, distance_km, effort")
      .gte("date", since)
      .order("date", { ascending: false });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 🔹 AI prompt build karo
    const prompt = `
      You are a running coach.
      Based on the last activities: ${JSON.stringify(history)},
      give a short plan for today's workout.
      Example: "Recovery 3 km @ easy pace"
    `;

    // 🔹 Local Ollama call karo
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral:latest",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      suggestion: data.response.trim(),
      rationale: `AI generated suggestion based on last ${history?.length ?? 0} activities.`,
      inputs: { history },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
