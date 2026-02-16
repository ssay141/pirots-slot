export async function POST(request) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return Response.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const required = ['session_id', 'bet_amount', 'total_win'];
  for (const field of required) {
    if (payload[field] === undefined) {
      return Response.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/game_sessions`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json({ error: text }, { status: res.status });
    }

    return new Response(null, { status: 201 });
  } catch (err) {
    return Response.json({ error: 'Failed to reach Supabase' }, { status: 502 });
  }
}
