import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin"; // server-side admin client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sport, title, date, durationMin, distanceKm, effort, notes } = body;

    // 1️⃣ Authorization header se token lena
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    // 2️⃣ Token validate karna aur user nikalna
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // 3️⃣ Derived stats calculate
    let paceMinPerKm: number | undefined;
    let avgSpeedKph: number | undefined;

    if (sport === "Run" && distanceKm) {
      paceMinPerKm = durationMin / distanceKm;
    }
    if (sport === "Ride" && distanceKm) {
      avgSpeedKph = (distanceKm / durationMin) * 60;
    }

    // 4️⃣ Insert row with user_id
    const { data, error } = await supabaseAdmin
      .from("activities")
      .insert([
          {
          user_id: user.id,
          sport,
          title,
          date,
          duration_min: durationMin,
          distance_km: distanceKm,
          effort,
          notes,
          pace_min_per_km: paceMinPerKm,
          avg_speed_kph: avgSpeedKph,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0]);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "Missing token" }, { status: 401 });

  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "Invalid user" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sport = searchParams.get("sport");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const search = searchParams.get("search");

  let query = supabaseAdmin.from("activities").select("*").eq("user_id", user.id).eq("deleted", false).order("date", { ascending: false });

  if (sport) query = query.eq("sport", sport);
  if (from) query = query.gte("date", from);
  if (to) query = query.lte("date", to);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}


export async function PATCH(req: Request) {
  const { id, ...updates } = await req.json();
  const { data, error } = await supabaseAdmin.from("activities").update(updates).eq("id", id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}


export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await supabaseAdmin.from("activities").update({ deleted: true }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return new Response(null, { status: 204 });
}
