import { createContext, useContext, type ReactNode } from "react";

export type Lang = "it" | "en";

export const SUPPORTED_LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const translations = {
  // ─── Hero ───
  "hero.title": {
    it: "Dove il benessere incontra la",
    en: "Where wellness meets the",
  },
  "hero.titleHighlight": {
    it: "luce del cambiamento",
    en: "light of change",
  },
  "hero.subtitle": {
    it: "Aurelia si prende cura del benessere fisico e mentale con integratori alimentari di alta qualità. Un movimento di crescita personale e libertà imprenditoriale.",
    en: "Aurelia takes care of your physical and mental well-being with high-quality dietary supplements. A movement of personal growth and entrepreneurial freedom.",
  },
  "hero.managerLabel": {
    it: "Il tuo Manager Aurelia",
    en: "Your Aurelia Manager",
  },

  // ─── Chat ───
  "chat.assistant": {
    it: "Assistente virtuale di",
    en: "Virtual assistant of",
  },
  "chat.online": { it: "Online", en: "Online" },
  "chat.offline": { it: "Offline", en: "Offline" },
  "chat.placeholder": {
    it: "Scrivi un messaggio...",
    en: "Write a message...",
  },
  "chat.startPrompt": {
    it: 'Premi "Avvia chat" per chiedere all\'assistente qualsiasi informazione sui prodotti, sulla azienda o sulle possibilità di guadagno di Aurelia',
    en: 'Press "Start chat" to ask the assistant anything about products, the company, or earning opportunities with Aurelia',
  },
  "chat.start": { it: "Avvia chat", en: "Start chat" },
  "chat.connecting": { it: "Connessione...", en: "Connecting..." },
  "chat.end": { it: "Termina chat", en: "End chat" },
  "chat.lang": { it: "Scegli lingua", en: "Choose language" },

  // ─── Chi siamo ───
  "about.title": { it: "Chi è", en: "Who is" },
  "about.p1": {
    it: "Aurelia si prende cura del benessere fisico e mentale, con una linea di integratori alimentari di alta qualità dedicati sia alle persone sia ai loro amici a quattro zampe.",
    en: "Aurelia takes care of physical and mental well-being, with a line of high-quality dietary supplements for both people and their four-legged friends.",
  },
  "about.p2": {
    it: "Non è solo salute: è un movimento di crescita personale e libertà imprenditoriale, dove la voglia di mettersi in gioco si unisce alla passione per il benessere.",
    en: "It's not just health: it's a movement of personal growth and entrepreneurial freedom, where the desire to take on challenges meets a passion for well-being.",
  },
  "about.cta": {
    it: "Scopri di più su di noi",
    en: "Learn more about us",
  },

  // ─── Prodotti ───
  "products.title": { it: "I nostri", en: "Our" },
  "products.titleHighlight": { it: "Prodotti", en: "Products" },
  "products.subtitle": {
    it: "Quattro linee pensate per il benessere quotidiano: nutrizione, bellezza, performance e stile di vita.",
    en: "Four lines designed for everyday well-being: nutrition, beauty, performance and lifestyle.",
  },
  "products.vitality.title": { it: "Linea Vitality", en: "Vitality Line" },
  "products.vitality.desc": {
    it: "Integratori nutrizionali per energia, metabolismo, sonno e difese immunitarie.",
    en: "Nutritional supplements for energy, metabolism, sleep and immune support.",
  },
  "products.glow.title": { it: "Linea Glow", en: "Glow Line" },
  "products.glow.desc": {
    it: "Skincare per il viso: sieri, detergenti e creme per una pelle luminosa e idratata.",
    en: "Facial skincare: serums, cleansers and creams for a radiant, hydrated complexion.",
  },
  "products.energy.title": { it: "Linea Energy", en: "Energy Line" },
  "products.energy.desc": {
    it: "Pre-workout, proteine e nootropi per chi vuole dare il massimo in ogni allenamento.",
    en: "Pre-workout, protein and nootropics for anyone who wants to give their all in every session.",
  },
  "products.home.title": { it: "Linea Home", en: "Home Line" },
  "products.home.desc": {
    it: "Diffusori e oli essenziali per portare il benessere anche negli ambienti di casa.",
    en: "Diffusers and essential oils to bring well-being into your home too.",
  },
  "products.cta": { it: "Scopri i prodotti", en: "Discover products" },

  // ─── Opportunità ───
  "opp.title": { it: "Un'", en: "An" },
  "opp.titleHighlight": { it: "opportunità", en: "opportunity" },
  "opp.titleEnd": { it: "per tutti", en: "for everyone" },
  "opp.subtitle": {
    it: "Diventa Consultant Aurelia: un piano trasparente che premia sia la vendita diretta sia la crescita di un team.",
    en: "Become an Aurelia Consultant: a transparent plan that rewards both direct sales and team growth.",
  },
  "opp.income.title": { it: "Entrata Extra", en: "Extra Income" },
  "opp.income.desc": {
    it: "Margine al dettaglio del 25-30% su ogni vendita, più commissioni di team su 5 livelli.",
    en: "A 25-30% retail margin on every sale, plus team commissions across 5 levels.",
  },
  "opp.growth.title": { it: "Crescita Personale", en: "Personal Growth" },
  "opp.growth.desc": {
    it: "Un percorso a qualifiche crescenti, da Associato a Diamond Ambassador, al tuo ritmo.",
    en: "A path of growing qualifications, from Associate to Diamond Ambassador, at your own pace.",
  },
  "opp.support.title": { it: "Affiancamento", en: "Support" },
  "opp.support.desc": {
    it: "Non sarai mai solo: il tuo Manager Aurelia ti accompagna passo dopo passo fin dal primo giorno.",
    en: "You'll never be alone: your Aurelia Manager guides you step by step from day one.",
  },
  "opp.training.title": { it: "Formazione", en: "Training" },
  "opp.training.desc": {
    it: "Webinar settimanali gratuiti e materiali di vendita per crescere con il tuo team.",
    en: "Free weekly webinars and sales materials to grow together with your team.",
  },
  "opp.cta": { it: "Scopri di più", en: "Learn more" },

  // ─── Eventi ───
  "events.title": { it: "in programma", en: "Upcoming" },
  "events.titleHighlight": { it: "Eventi", en: "Events" },
  "events.subtitle": {
    it: "Partecipa ai nostri eventi per scoprire di più su Aurelia e il nostro progetto.",
    en: "Join our events to learn more about Aurelia and our project.",
  },
  "events.virtual": { it: "Evento virtuale", en: "Virtual event" },
  "videos.title": { it: "in evidenza", en: "Featured" },
  "videos.titleHighlight": { it: "Video", en: "Videos" },
  "videos.subtitle": {
    it: "Guarda i nostri contenuti video, selezionati per te dal tuo Manager.",
    en: "Watch our video content, selected for you by your Manager.",
  },
  "events.participate": { it: "Chiedi di partecipare", en: "Request to participate" },
  "events.dialog.title": { it: "Chiedi di partecipare", en: "Request to participate" },
  "events.dialog.name": { it: "Nome", en: "First name" },
  "events.dialog.surname": { it: "Cognome", en: "Last name" },
  "events.dialog.email": { it: "Email", en: "Email" },
  "events.dialog.phone": { it: "Telefono", en: "Phone" },
  "events.dialog.message": { it: "Messaggio", en: "Message" },
  "events.dialog.messagePlaceholder": {
    it: "Scrivi un messaggio (facoltativo)",
    en: "Write a message (optional)",
  },
  "events.dialog.submit": { it: "Invia richiesta", en: "Send request" },
  "events.dialog.sending": { it: "Invio in corso...", en: "Sending..." },
  "events.toast.success": {
    it: "Richiesta di partecipazione inviata correttamente!",
    en: "Participation request sent successfully!",
  },
  "events.toast.error": {
    it: "Errore durante l'invio della richiesta. Riprova.",
    en: "Error sending the request. Please try again.",
  },

  // ─── Contatti ───
  "contact.title": { it: "Restiamo in", en: "Let's stay in" },
  "contact.titleHighlight": { it: "contatto", en: "touch" },
  "contact.subtitle": {
    it: "Scegli il modo che preferisci per contattare il tuo Manager Aurelia.",
    en: "Choose your preferred way to contact your Aurelia Manager.",
  },
  "contact.call": { it: "Prenota una call", en: "Book a call" },
  "contact.callDesc": {
    it: "Scegli data e ora dal calendario",
    en: "Choose date and time from the calendar",
  },
  "contact.whatsapp": { it: "Scrivi su WhatsApp", en: "Write on WhatsApp" },
  "contact.whatsappDesc": { it: "Risposte rapide e dirette", en: "Fast and direct replies" },
  "contact.formTitle": { it: "Lascia i tuoi dati", en: "Leave your details" },
  "contact.name": { it: "Nome e Cognome", en: "Full Name" },
  "contact.email": { it: "Email", en: "Email" },
  "contact.phone": { it: "Telefono", en: "Phone" },
  "contact.message": { it: "Messaggio (opzionale)", en: "Message (optional)" },
  "contact.submit": { it: "Invia richiesta", en: "Send request" },
  "contact.sending": { it: "Invio in corso...", en: "Sending..." },
  "contact.toast.success": {
    it: "Grazie! La tua richiesta è stata inviata con successo.",
    en: "Thank you! Your request has been sent successfully.",
  },
  "contact.toast.mailto": {
    it: "Si aprirà il tuo client email per completare l'invio.",
    en: "Your email client will open to complete the submission.",
  },
  "contact.toast.error": {
    it: "Errore nell'invio. Riprova più tardi.",
    en: "Error sending. Please try again later.",
  },

  // ─── Footer ───
  "footer.terms": { it: "Termini e condizioni", en: "Terms and conditions" },

  // ─── Nav section anchors ───
  "nav.products": { it: "Prodotti", en: "Products" },
  "nav.opportunities": { it: "Opportunità", en: "Opportunities" },
  "nav.events": { it: "Eventi", en: "Events" },
  "nav.contact": { it: "Contatti", en: "Contact" },
} as const;

type TranslationKey = keyof typeof translations;

const LangContext = createContext<Lang>("it");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const lang = useLang();
  return (key: TranslationKey) => translations[key][lang] ?? translations[key]["it"];
}
