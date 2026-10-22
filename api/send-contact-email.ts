export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { to, senderName, senderEmail, senderPhone, message } = await req.json();

    if (!to || !senderName || !senderEmail || !senderPhone) {
      return new Response(JSON.stringify({ error: "Campi obbligatori mancanti" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const subject = `Nuovo contatto da ${senderName} - Sunflowers Landing`;
    const body = [
      `Nome: ${senderName}`,
      `Email: ${senderEmail}`,
      `Telefono: ${senderPhone}`,
      message ? `Messaggio: ${message}` : "",
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
          from: "Sunflowers <info@datexit.com>",
          to: [to],
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

    // Fallback: return the data so the frontend can use mailto
    return new Response(JSON.stringify({ success: true, fallback: "mailto", to, subject, body }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Send email error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
