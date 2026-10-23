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
  "chat.online": { it: "Online", en: "Online", pl: "Online" },
  "chat.offline": { it: "Offline", en: "Offline", pl: "Offline" },
  "chat.placeholder": {
    it: "Scrivi un messaggio...",
    en: "Write a message...",
  },
  "chat.startPrompt": {
    it: 'Premi "Avvia chat" per chiedere all\'assistente qualsiasi informazione sui prodotti, sulla azienda o sulle possibilità di guadagno di Aurelia',
    en: 'Press "Start chat" to ask the assistant anything about products, the company, or earning opportunities with Aurelia',
  },
  "chat.start": { it: "Avvia chat", en: "Start chat", pl: "Rozpocznij czat" },
  "chat.connecting": { it: "Connessione...", en: "Connecting...", pl: "Łączenie..." },
  "chat.end": { it: "Termina chat", en: "End chat", pl: "Zakończ czat" },
  "chat.lang": { it: "Scegli lingua", en: "Choose language", pl: "Wybierz język" },

  // ─── Chi siamo ───
  "about.title": { it: "Chi è", en: "Who is", pl: "Kim jest" },
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
  "products.title": { it: "I nostri", en: "Our", pl: "Nasze" },
  "products.titleHighlight": { it: "Prodotti", en: "Products", pl: "Produkty" },
  "products.subtitle": {
    it: "Integratori alimentari di alta qualità, pensati per il benessere di tutta la famiglia.",
    en: "High-quality dietary supplements designed for the well-being of the whole family.",
  },
  "products.natural.title": { it: "Benessere Naturale", en: "Natural Wellness", pl: "Naturalne Zdrowie" },
  "products.natural.desc": {
    it: "Integratori formulati con ingredienti naturali per supportare il tuo equilibrio quotidiano.",
    en: "Supplements formulated with natural ingredients to support your daily balance.",
  },
  "products.vitality.title": { it: "Vitalità & Energia", en: "Vitality & Energy", pl: "Witalność i Energia" },
  "products.vitality.desc": {
    it: "Più energia, più equilibrio, più vitalità per affrontare ogni giornata al meglio.",
    en: "More energy, more balance, more vitality to face every day at your best.",
  },
  "products.pet.title": { it: "Pet Wellness", en: "Pet Wellness", pl: "Zdrowie Zwierząt" },
  "products.pet.desc": {
    it: "Una linea dedicata ai tuoi amici a quattro zampe, perché anche loro meritano il meglio.",
    en: "A line dedicated to your four-legged friends, because they deserve the best too.",
  },
  "products.cta": { it: "Scopri i prodotti", en: "Discover products", pl: "Odkryj produkty" },

  // ─── Opportunità ───
  "opp.title": { it: "Un'", en: "An", pl: "" },
  "opp.titleHighlight": { it: "opportunità", en: "opportunity", pl: "Szansa" },
  "opp.titleEnd": { it: "per tutti", en: "for everyone", pl: "dla każdego" },
  "opp.subtitle": {
    it: "Entra in un progetto dove il benessere diventa anche un'opportunità di crescita professionale e personale.",
    en: "Join a project where wellness becomes an opportunity for professional and personal growth.",
  },
  "opp.income.title": { it: "Entrata Extra", en: "Extra Income", pl: "Dodatkowy Dochód" },
  "opp.income.desc": {
    it: "Costruisci un'entrata aggiuntiva con un modello flessibile e sostenibile.",
    en: "Build additional income with a flexible and sustainable model.",
  },
  "opp.growth.title": { it: "Crescita Personale", en: "Personal Growth", pl: "Rozwój Osobisty" },
  "opp.growth.desc": {
    it: "Un percorso che ti aiuta a scoprire la parte migliore di te.",
    en: "A journey that helps you discover the best part of yourself.",
  },
  "opp.support.title": { it: "Affiancamento", en: "Support", pl: "Wsparcie" },
  "opp.support.desc": {
    it: "Non sarai mai solo. Un team dedicato ti accompagna passo dopo passo.",
    en: "You'll never be alone. A dedicated team will guide you step by step.",
  },
  "opp.training.title": { it: "Formazione", en: "Training", pl: "Szkolenie" },
  "opp.training.desc": {
    it: "Accesso a formazione continua per sviluppare competenze e leadership.",
    en: "Access to ongoing training to develop skills and leadership.",
  },
  "opp.cta": { it: "Scopri di più", en: "Learn more", pl: "Dowiedz się więcej" },

  // ─── Eventi ───
  "events.title": { it: "in programma", en: "Upcoming", pl: "Nadchodzące" },
  "events.titleHighlight": { it: "Eventi", en: "Events", pl: "Wydarzenia" },
  "events.subtitle": {
    it: "Partecipa ai nostri eventi per scoprire di più su Aurelia e il nostro progetto.",
    en: "Join our events to learn more about Aurelia and our project.",
  },
  "events.virtual": { it: "Evento virtuale", en: "Virtual event", pl: "Wydarzenie wirtualne" },
  "videos.title": { it: "in evidenza", en: "Featured", pl: "Wyróżnione" },
  "videos.titleHighlight": { it: "Video", en: "Videos", pl: "Filmy" },
  "videos.subtitle": {
    it: "Guarda i nostri contenuti video, selezionati per te dal tuo Manager.",
    en: "Watch our video content, selected for you by your Manager.",
  },
  "events.participate": { it: "Chiedi di partecipare", en: "Request to participate", pl: "Poproś o udział" },
  "events.dialog.title": { it: "Chiedi di partecipare", en: "Request to participate", pl: "Poproś o udział" },
  "events.dialog.name": { it: "Nome", en: "First name", pl: "Imię" },
  "events.dialog.surname": { it: "Cognome", en: "Last name", pl: "Nazwisko" },
  "events.dialog.email": { it: "Email", en: "Email", pl: "Email" },
  "events.dialog.phone": { it: "Telefono", en: "Phone", pl: "Telefon" },
  "events.dialog.message": { it: "Messaggio", en: "Message", pl: "Wiadomość" },
  "events.dialog.messagePlaceholder": {
    it: "Scrivi un messaggio (facoltativo)",
    en: "Write a message (optional)",
  },
  "events.dialog.submit": { it: "Invia richiesta", en: "Send request", pl: "Wyślij zapytanie" },
  "events.dialog.sending": { it: "Invio in corso...", en: "Sending...", pl: "Wysyłanie..." },
  "events.toast.success": {
    it: "Richiesta di partecipazione inviata correttamente!",
    en: "Participation request sent successfully!",
  },
  "events.toast.error": {
    it: "Errore durante l'invio della richiesta. Riprova.",
    en: "Error sending the request. Please try again.",
  },

  // ─── Contatti ───
  "contact.title": { it: "Restiamo in", en: "Let's stay in", pl: "Pozostańmy w" },
  "contact.titleHighlight": { it: "contatto", en: "touch", pl: "kontakcie" },
  "contact.subtitle": {
    it: "Scegli il modo che preferisci per contattare il tuo Manager Aurelia.",
    en: "Choose your preferred way to contact your Aurelia Manager.",
  },
  "contact.call": { it: "Prenota una call", en: "Book a call", pl: "Zarezerwuj rozmowę" },
  "contact.callDesc": {
    it: "Scegli data e ora dal calendario",
    en: "Choose date and time from the calendar",
  },
  "contact.whatsapp": { it: "Scrivi su WhatsApp", en: "Write on WhatsApp", pl: "Napisz na WhatsApp" },
  "contact.whatsappDesc": { it: "Risposte rapide e dirette", en: "Fast and direct replies", pl: "Szybkie i bezpośrednie odpowiedzi" },
  "contact.formTitle": { it: "Lascia i tuoi dati", en: "Leave your details", pl: "Zostaw swoje dane" },
  "contact.name": { it: "Nome e Cognome", en: "Full Name", pl: "Imię i Nazwisko" },
  "contact.email": { it: "Email", en: "Email", pl: "Email" },
  "contact.phone": { it: "Telefono", en: "Phone", pl: "Telefon" },
  "contact.message": { it: "Messaggio (opzionale)", en: "Message (optional)", pl: "Wiadomość (opcjonalnie)" },
  "contact.submit": { it: "Invia richiesta", en: "Send request", pl: "Wyślij zapytanie" },
  "contact.sending": { it: "Invio in corso...", en: "Sending...", pl: "Wysyłanie..." },
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
  "footer.terms": { it: "Termini e condizioni", en: "Terms and conditions", pl: "Regulamin" },

  // ─── Nav section anchors ───
  "nav.products": { it: "Prodotti", en: "Products", pl: "Produkty" },
  "nav.opportunities": { it: "Opportunità", en: "Opportunities", pl: "Możliwości" },
  "nav.events": { it: "Eventi", en: "Events", pl: "Wydarzenia" },
  "nav.contact": { it: "Contatti", en: "Contact", pl: "Kontakt" },
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
