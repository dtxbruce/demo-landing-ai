import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Sparkles, Zap, Home as HomeIcon } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const lines = [
  {
    icon: Leaf,
    name: "Linea Vitality",
    subtitle: "Integratori Nutrizionali",
    items: [
      { name: "Aurelia Multivit+", desc: "Multivitaminico completo ad ampio spettro, per sostenere l'energia quotidiana e le difese naturali." },
      { name: "Aurelia BurnFit", desc: "Supporto al metabolismo energetico, per chi segue un percorso di controllo del peso." },
      { name: "Aurelia ZenNight", desc: "Melatonina, magnesio e camomilla, per favorire relax e qualità del sonno." },
      { name: "Aurelia ImmunoShield", desc: "Vitamina C, zinco ed echinacea, a supporto delle difese immunitarie." },
    ],
  },
  {
    icon: Sparkles,
    name: "Linea Glow",
    subtitle: "Bellezza e Skincare",
    items: [
      { name: "Aurelia Glow Serum", desc: "Siero viso illuminante con acido ialuronico e vitamina C." },
      { name: "Aurelia Pure Cleanse", desc: "Detergente viso delicato, senza solfati aggressivi." },
      { name: "Aurelia Radiance Cream", desc: "Crema idratante anti-età giorno/notte." },
    ],
  },
  {
    icon: Zap,
    name: "Linea Energy",
    subtitle: "Sport e Performance",
    items: [
      { name: "Aurelia Boost Pre-Workout", desc: "Energia pre-allenamento con caffeina naturale e guaranà." },
      { name: "Aurelia Recover Protein", desc: "Proteine ad alto valore biologico per il recupero post-allenamento." },
      { name: "Aurelia Focus", desc: "Nootropo per concentrazione e lucidità mentale." },
    ],
  },
  {
    icon: HomeIcon,
    name: "Linea Home",
    subtitle: "Casa e Stile di Vita",
    items: [
      { name: "Aurelia Pure Air", desc: "Diffusore elettrico di oli essenziali ad ultrasuoni." },
      { name: "Aurelia Essential Oils Collection", desc: "6 oli essenziali puri al 100%: lavanda, eucalipto, limone, menta, arancio dolce, tea tree." },
    ],
  },
];

const faqs = [
  {
    q: "I prodotti sono adatti a tutti?",
    a: "Gli integratori alimentari non sostituiscono una dieta varia ed equilibrata e uno stile di vita sano. In caso di gravidanza, allattamento, patologie in corso o terapie farmacologiche, si consiglia di consultare il proprio medico prima dell'uso.",
  },
  {
    q: "Dove vengono prodotti?",
    a: "Tutti i prodotti Aurelia sono realizzati in stabilimenti certificati nell'Unione Europea, nel rispetto delle normative vigenti su sicurezza alimentare e cosmetica.",
  },
  {
    q: "C'è una garanzia soddisfatti o rimborsati?",
    a: "Sì, Aurelia offre una garanzia di rimborso entro 30 giorni dall'acquisto per i clienti non soddisfatti, sui prodotti non aperti o parzialmente utilizzati.",
  },
  {
    q: "Come si acquista?",
    a: "I prodotti si acquistano esclusivamente tramite un Consultant Aurelia, che segue il cliente nella scelta più adatta alle proprie esigenze.",
  },
];

export default function Prodotti() {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden bg-gradient-navy pt-10 pb-20">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-sunflower/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 w-64 h-64 rounded-full bg-sunflower/10 blur-3xl" />

        <div className="relative container mx-auto px-6 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-sunflower mb-3 tracking-wide uppercase">Aurelia Wellness</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">I Nostri Prodotti</h1>
            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
              Quattro linee di prodotto pensate per il benessere quotidiano: nutrizione, bellezza, performance sportiva e stile di vita.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-6 pb-20 max-w-4xl -mt-10 relative">
        <div className="space-y-12">
          {lines.map((line, li) => (
            <motion.section
              key={line.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: li * 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sunflower/10 flex items-center justify-center shrink-0">
                  <line.icon className="w-6 h-6 text-sunflower-dark" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-semibold text-foreground">{line.name}</h2>
                  <p className="text-sm text-muted-foreground">{line.subtitle}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {line.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-background rounded-xl p-5 border border-border hover:border-sunflower/30 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1.5">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <section className="mt-14 bg-card rounded-2xl p-6 md:p-8 border border-border">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Domande frequenti</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-sunflower-dark">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <p className="text-xs text-muted-foreground/60 mt-10 pt-6 border-t border-border">
          Aurelia Wellness è un'azienda di fantasia, creata a scopo dimostrativo. Nome, prodotti e formulazioni descritte non corrispondono a prodotti reali in commercio.
        </p>
      </div>
      <Footer />
    </div>
  );
}
