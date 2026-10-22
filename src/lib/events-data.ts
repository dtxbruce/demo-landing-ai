export interface EventData {
  id: string;
  titolo: string;
  descrizione: string;
  data: string;
  ora: string;
  sede: string;
  indirizzo: string;
  citta: string;
  prov: string;
  virtuale: boolean;
}

function stripHtml(html: string): string {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").trim();
}

export async function fetchEvents(agentId: string): Promise<EventData[]> {
  const res = await fetch(`/api/events-proxy?id_agente=${encodeURIComponent(agentId)}`);

  if (!res.ok) {
    throw new Error(`Events proxy error: ${res.status}`);
  }

  const json = await res.json();
  const result = json.EventsListResult;

  if (result.esito.codice !== "OK" || !result.dati?.length) {
    return [];
  }

  return result.dati.map((d: any) => ({
    id: d.id,
    titolo: d.titolo || "",
    descrizione: stripHtml(d.descrizione || ""),
    data: d.data || "",
    ora: d.ora || "",
    sede: d.sede || "",
    indirizzo: d.indirizzo || "",
    citta: d.citta || "",
    prov: d.prov || "",
    virtuale: d.virtuale === "1",
  }));
}
