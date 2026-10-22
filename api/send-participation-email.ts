export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const {
      agentEmail,
      participantName,
      participantSurname,
      participantEmail,
      participantPhone,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      message,
    } = await req.json();

    if (!agentEmail || !participantName || !participantSurname || !participantEmail || !participantPhone || !eventTitle) {
      return new Response(JSON.stringify({ error: "Campi obbligatori mancanti" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const subject = "Richiesta di partecipazione";
    const body = [
      "È stata ricevuta una richiesta di partecipazione all'evento indicato di seguito.",
      "",
      "--- DATI EVENTO ---",
      `Titolo: ${eventTitle}`,
      `Data: ${eventDate || "N/D"}`,
      `Ora: ${eventTime || "N/D"}`,
      eventLocation ? `Luogo: ${eventLocation}` : "",
      "",
      "--- DATI PARTECIPANTE ---",
      `Nome: ${participantName}`,
      `Cognome: ${participantSurname}`,
      `Email: ${participantEmail}`,
      `Telefono: ${participantPhone}`,
      message ? `\nMessaggio: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "STONE MLM DEMO <info@datexit.com>",
          to: [agentEmail],
          subject,
          text: body,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Email service error: ${res.status} - ${errBody}`);
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fallback: return data for mailto
    return new Response(JSON.stringify({ success: true, fallback: "mailto", to: agentEmail, subject, body }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Send participation email error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
