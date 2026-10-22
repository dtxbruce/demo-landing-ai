export const config = { runtime: "edge" };

const API_BASE = "https://sun-api-wld39hs72m.datexit.com/api_ai/test/StoneMLMServiceAI.svc/json";

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const codice = url.searchParams.get("codice");

  if (!codice) {
    return new Response(JSON.stringify({ error: "Parametro 'codice' mancante" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiUser = process.env.DATEXIT_API_USER;
  const apiPass = process.env.DATEXIT_API_PASS;

  if (!apiUser || !apiPass) {
    return new Response(JSON.stringify({ error: "Credenziali API non configurate (DATEXIT_API_USER / DATEXIT_API_PASS)" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const credentials = btoa(`${apiUser}:${apiPass}`);
    const apiUrl = `${API_BASE}/who_is_landing_ai?codice=${encodeURIComponent(codice)}`;

    const response = await fetch(apiUrl, {
      headers: { Authorization: `Basic ${credentials}` },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`API error [${response.status}]: ${body}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
