

export interface ManagerData {
  id: string;
  identificativo: string;
  firstName: string;
  lastName: string;
  photo: string;
  city: string;
  email: string;
  bio: string;
  welcomeMessage: string;
  calendarUrl?: string;
  whatsappNumber?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

function stripHtml(html: string): string {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").trim();
}

function parsePhoto(value: string | undefined): string {
  if (!value) return "";
  // If it's already a URL, return as-is
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  // If it's base64 data, prefix with data URI
  if (value.length > 100) {
    // Clean any whitespace from base64
    const cleaned = value.replace(/\s/g, "");
    return `data:image/jpeg;base64,${cleaned}`;
  }
  return value;
}

export async function fetchManagerData(codice: string): Promise<ManagerData> {
  const res = await fetch(`/api/manager-proxy?codice=${encodeURIComponent(codice)}`);

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Proxy error: ${res.status} - ${errBody}`);
  }

  const json = await res.json();
  const result = json.WhoIsLandingAIResult;

  if (result.esito.codice !== "OK" || !result.dati?.length) {
    throw new Error(result.esito.descrizione || "Agente non trovato");
  }

  const d = result.dati[0];

  return {
    id: d.id_agente,
    identificativo: d.identificativo || "",
    firstName: d.nome || d.identificativo.split(" ")[0],
    lastName: d.cognome,
    photo: parsePhoto(d.file_foto),
    city: d.localita || "",
    email: d.email || "",
    bio: stripHtml(d.testo_bio || ""),
    welcomeMessage: stripHtml(d.testo_benvenuto || ""),
    calendarUrl: d.cal_url || undefined,
    whatsappNumber: d.wa_cell || undefined,
    socials: {
      instagram: d.ig || undefined,
      facebook: d.fb || undefined,
      linkedin: d.ln ? (d.ln.startsWith("http") ? d.ln : `https://${d.ln}`) : undefined,
    },
  };
}

// Fallback data
export function getDefaultManager(): ManagerData {
  return {
    id: "3007",
    identificativo: "AGENTE 01 URZIA",
    firstName: "",
    lastName: "AGENTE 01 URZIA",
    photo: "https://www.datexit.com/piattaforme/stonemlm/sunflowers/test/pictures/3007.jpg",
    city: "Milano",
    email: "agente01@test.it",
    bio: "Da oltre 5 anni nel mondo del benessere, aiuto le persone a scoprire il loro potenziale attraverso prodotti di qualità e un percorso di crescita personale.",
    welcomeMessage: "Ciao! Sono felice che tu sia qui. Sono pronta ad accompagnarti in questo viaggio verso il benessere e la crescita personale.\nNon esitare a contattarmi!\n\nLa mia email è aaa@dddd.it",
    calendarUrl: "https://calendly.com/gigetto",
    whatsappNumber: "33333333333333",
    socials: {
      instagram: "https://www.instagram.com/stone_mlmxxxx/",
      facebook: "https://www.facebook.com/StoneMLM2xxxx/",
      linkedin: "https://linkedin.com/showcase/stone-mlm-multi-level-marketingxxx/",
    },
  };
}
