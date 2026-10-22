export const config = { runtime: "edge" };

const API_BASE = "https://dtx-api-demo.datexit.com/api_ai/StoneMLMServiceAI.svc/json";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
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
    const { nome, cognome, email, telefono, agente, id_evento, note } = await req.json();

    if (!nome || !cognome || !email || !telefono || !agente || !id_evento) {
      return new Response(JSON.stringify({ error: "Campi obbligatori mancanti" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const credentials = btoa(`${apiUser}:${apiPass}`);

    // Step 1: ins_contatto
    const contattoBody = {
      cognome,
      nome,
      indirizzo: "",
      cap: "",
      citta: "",
      provincia: "",
      nazione: "",
      agente,
      email,
      telefono,
      note: note || "",
    };

    const contattoRes = await fetch(`${API_BASE}/ins_contatto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(contattoBody),
    });

    if (!contattoRes.ok) {
      const errBody = await contattoRes.text();
      throw new Error(`ins_contatto error [${contattoRes.status}]: ${errBody}`);
    }

    const contattoData = await contattoRes.json();
    console.log("ins_contatto response:", JSON.stringify(contattoData));

    const rawId =
      contattoData?.id_contatto ||
      contattoData?.id ||
      contattoData?.InsContattoResult?.id_contatto ||
      contattoData?.InsContattoResult?.id ||
      contattoData?.result?.id_contatto ||
      contattoData?.result?.id;

    const id_contatto = rawId && String(rawId).trim() !== "" ? String(rawId).trim() : null;

    if (!id_contatto) {
      console.warn("ins_contatto returned empty id (likely duplicate contact):", JSON.stringify(contattoData));
      return new Response(
        JSON.stringify({ success: true, duplicate: true, message: "Contatto già registrato" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 2: ins_partecipante
    const partecipanteBody = {
      id_evento: String(id_evento),
      id_contatto: String(id_contatto),
    };

    const partecipanteRes = await fetch(`${API_BASE}/ins_partecipante`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(partecipanteBody),
    });

    if (!partecipanteRes.ok) {
      const errBody = await partecipanteRes.text();
      throw new Error(`ins_partecipante error [${partecipanteRes.status}]: ${errBody}`);
    }

    const partecipanteData = await partecipanteRes.json();
    console.log("ins_partecipante response:", JSON.stringify(partecipanteData));

    return new Response(
      JSON.stringify({ success: true, id_contatto, partecipante: partecipanteData }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Event registration error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
