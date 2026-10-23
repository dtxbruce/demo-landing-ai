import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet, Rocket, Users, Crown, Car, Check } from "lucide-react";
import { Footer } from "@/components/landing/Footer";

const earnings = [
  {
    icon: Wallet,
    title: "Margine al dettaglio",
    desc: "Ogni Consultant acquista al prezzo riservato e rivende al prezzo di listino, trattenendo un margine del 25-30% su ogni vendita diretta.",
  },
  {
    icon: Rocket,
    title: "Bonus Fast Start",
    desc: "Nei primi 30 giorni, bonus del 20% sugli ordini di avvio dei nuovi Consultant iscritti personalmente.",
  },
  {
    icon: Users,
    title: "Commissioni di Team",
    desc: "Struttura unilevel a 5 livelli di profondità, con percentuali a scalare dal 10% (1° livello) al 3% (5° livello).",
  },
  {
    icon: Crown,
    title: "Bonus Leadership",
    desc: "Dal rango Team Leader, bonus generazionale sui volumi di gruppo complessivi dell'organizzazione.",
  },
  {
    icon: Car,
    title: "Bonus Lifestyle",
    desc: "Dal rango Senior Leader, contributo mensile fisso al raggiungimento e mantenimento dei requisiti di rango.",
  },
];

const teamLevels = [
  { level: "1° livello (iscritti diretti)", pct: "10%" },
  { level: "2° livello", pct: "7%" },
  { level: "3° livello", pct: "5%" },
  { level: "4° livello", pct: "4%" },
  { level: "5° livello", pct: "3%" },
];

const ranks = [
  { rank: "Associato", req: "Iscrizione con Kit di Avvio" },
  { rank: "Consultant Argento", req: "50 PV personali al mese" },
  { rank: "Consultant Oro", req: "150 PV personali + 1 Consultant Argento in team" },
  { rank: "Team Leader", req: "500 GV di gruppo + 3 Consultant Oro in team" },
  { rank: "Senior Leader", req: "2.000 GV di gruppo + 2 Team Leader in team" },
  { rank: "Diamond Ambassador", req: "10.000 GV di gruppo + 4 Senior Leader in team" },
];

const perks = [
  "Nessun obbligo di magazzino: si ordina solo ciò che serve",
  "Formazione gratuita: webinar settimanali e affiancamento",
  "Pagamenti puntuali entro il 15 del mese successivo",
  "Piano compensi pubblico e trasparente",
];

const faqs = [
  { q: "Serve esperienza di vendita?", a: "No, la formazione Aurelia accompagna chiunque parta da zero." },
  { q: "Si può fare part-time?", a: "Sì, la maggior parte dei Consultant Aurelia lavora part-time accanto ad altre attività." },
  { q: "Ci sono costi ricorrenti obbligatori?", a: "No, oltre al Kit di Avvio iniziale non ci sono abbonamenti obbligatori per restare iscritti." },
];

export default function PianoMarketing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 pt-10 pb-20 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Torna alla home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-sunflower-dark mb-3 tracking-wide uppercase">Aurelia Wellness</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Il Nostro Piano Marketing</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Un piano trasparente che premia sia la vendita diretta sia lo sviluppo di un team, con guadagno reale fin dal primo ordine.
          </p>
        </motion.div>

        <section className="mb-14">
          <h2 className="text-xl font-display font-semibold text-foreground mb-2">Come si inizia</h2>
          <p className="text-muted-foreground leading-relaxed">
            Per diventare Consultant Aurelia si acquista un Kit di Avvio (da 99€ a 299€ a seconda della linea scelta), che include prodotti dimostrativi, materiale informativo e accesso all'area riservata per gestire ordini, clienti e team.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-display font-semibold text-foreground mb-6">Le fonti di guadagno</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {earnings.map((e) => (
              <div key={e.title} className="bg-card rounded-xl p-5 border border-border">
                <e.icon className="w-6 h-6 text-sunflower-dark mb-3" />
                <h3 className="font-semibold text-foreground mb-1.5">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Commissioni di Team (Unilevel 5 livelli)</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {teamLevels.map((l, i) => (
                <div
                  key={l.level}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${i !== teamLevels.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-muted-foreground">{l.level}</span>
                  <span className="font-semibold text-foreground">{l.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">I ranghi Aurelia</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {ranks.map((r, i) => (
                <div key={r.rank} className={`px-4 py-3 text-sm ${i !== ranks.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="font-semibold text-foreground">{r.rank}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{r.req}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/70 mt-2">
              PV = Punti Volume personali. GV = Volume di Gruppo (somma dei PV dell'intera organizzazione personale).
            </p>
          </div>
        </section>

        <section className="mb-14 bg-sunflower/5 rounded-2xl p-6 border border-sunflower/20">
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Requisito di qualificazione mensile:</strong> per restare "attivo" e avere diritto alle commissioni di team, ogni Consultant deve generare almeno 50 PV al mese, raggiungibili sia con acquisti personali sia con vendite al dettaglio documentate.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-display font-semibold text-foreground mb-5">Perché Aurelia</h2>
          <ul className="space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-muted-foreground">
                <Check className="w-5 h-5 text-sunflower-dark shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-12 border-t border-border">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Domande frequenti</h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-foreground mb-1">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs text-muted-foreground/60 mt-14 pt-6 border-t border-border">
          Aurelia Wellness è un'azienda di fantasia, creata a scopo dimostrativo. Il piano marketing descritto è un esempio illustrativo e non rappresenta un'offerta commerciale reale.
        </p>
      </div>
      <Footer />
    </div>
  );
}
