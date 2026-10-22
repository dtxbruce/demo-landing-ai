import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { fetchEvents, type EventData } from "@/lib/events-data";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useT } from "@/lib/i18n";

interface EventiSectionProps {
  agentId: string;
}

function EventCard({
  event,
  index,
  onParticipate,
  t,
}: {
  event: EventData;
  index: number;
  onParticipate: (event: EventData) => void;
  t: ReturnType<typeof useT>;
}) {
  const fullAddress = [event.indirizzo, event.citta, event.prov]
    .filter(Boolean)
    .join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="bg-background rounded-2xl p-6 border border-border hover:border-sunflower/30 transition-all group h-full flex flex-col"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-sunflower/10 flex items-center justify-center shrink-0 group-hover:bg-sunflower/20 transition-colors">
          {event.virtuale ? (
            <Monitor className="w-5 h-5 text-sunflower-dark" />
          ) : (
            <Calendar className="w-5 h-5 text-sunflower-dark" />
          )}
        </div>
        <h3 className="text-base font-display font-semibold text-foreground leading-snug">
          {event.titolo}
        </h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 whitespace-pre-line">
        {event.descrizione}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Calendar className="w-3.5 h-3.5" />
        {event.data} — {event.ora}
      </div>
      {!event.virtuale && (event.sede || fullAddress) && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>
            {event.sede && <span className="font-medium">{event.sede}</span>}
            {event.sede && fullAddress && <br />}
            {fullAddress}
          </span>
        </div>
      )}
      {event.virtuale && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
          <Monitor className="w-3.5 h-3.5" />
          {t("events.virtual")}
        </div>
      )}
      <div className="mt-auto pt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full border-primary/20 hover:bg-sunflower/10 hover:border-sunflower/30 text-foreground"
          onClick={() => onParticipate(event)}
        >
          {t("events.participate")}
        </Button>
      </div>
    </motion.div>
  );
}

export function EventiSection({ agentId }: EventiSectionProps) {
  const t = useT();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    messaggio: "",
  });

  useEffect(() => {
    fetchEvents(agentId)
      .then(setEvents)
      .catch((err) => {
        console.error("Errore caricamento eventi:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, [agentId]);

  const handleParticipate = (event: EventData) => {
    setSelectedEvent(event);
    setForm({ nome: "", cognome: "", email: "", telefono: "", messaggio: "" });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !form.nome || !form.cognome || !form.email || !form.telefono) return;

    setSending(true);

    try {
      const res = await fetch("/api/event-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          cognome: form.cognome,
          email: form.email,
          telefono: form.telefono,
          agente: agentId,
          id_evento: selectedEvent.id,
          note: form.messaggio || "",
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Errore sconosciuto");

      setDialogOpen(false);
      setSuccessOpen(true);
    } catch (err) {
      console.error("Errore invio richiesta:", err);
      toast.error(t("events.toast.error"));
    } finally {
      setSending(false);
    }
  };

  if (loading || events.length === 0) return null;

  const useSlider = events.length > 3;

  return (
    <>
      <section id="eventi" className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              <span className="text-gradient-sunflower">{t("events.titleHighlight")}</span> {t("events.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("events.subtitle")}
            </p>
          </motion.div>

          {useSlider ? (
            <div className="max-w-5xl mx-auto">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {events.map((event, i) => (
                    <CarouselItem key={event.id} className="md:basis-1/3">
                      <EventCard event={event} index={i} onParticipate={handleParticipate} t={t} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <div
              className={`grid gap-8 max-w-5xl mx-auto ${
                events.length === 1
                  ? "md:grid-cols-1 max-w-md"
                  : events.length === 2
                  ? "md:grid-cols-2 max-w-3xl"
                  : "md:grid-cols-3"
              }`}
            >
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} onParticipate={handleParticipate} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">{t("events.dialog.title")}</DialogTitle>
            <DialogDescription className="space-y-1">
              <span>{selectedEvent?.titolo} — {selectedEvent?.data} alle {selectedEvent?.ora}</span>
              {selectedEvent && !selectedEvent.virtuale && (() => {
                const addr = [selectedEvent.sede, selectedEvent.indirizzo, selectedEvent.citta, selectedEvent.prov].filter(Boolean).join(", ");
                return addr ? <span className="block text-xs"><MapPin className="inline w-3 h-3 mr-1" />{addr}</span> : null;
              })()}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="part-nome">{t("events.dialog.name")} *</Label>
              <Input
                id="part-nome"
                required
                maxLength={100}
                value={form.nome}
                onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="part-cognome">{t("events.dialog.surname")} *</Label>
              <Input
                id="part-cognome"
                required
                maxLength={100}
                value={form.cognome}
                onChange={(e) => setForm((f) => ({ ...f, cognome: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="part-email">{t("events.dialog.email")} *</Label>
              <Input
                id="part-email"
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="part-telefono">{t("events.dialog.phone")} *</Label>
              <Input
                id="part-telefono"
                type="tel"
                required
                maxLength={20}
                value={form.telefono}
                onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="part-messaggio">{t("events.dialog.message")}</Label>
              <Textarea
                id="part-messaggio"
                maxLength={500}
                rows={3}
                placeholder={t("events.dialog.messagePlaceholder")}
                value={form.messaggio}
                onChange={(e) => setForm((f) => ({ ...f, messaggio: e.target.value }))}
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-sunflower hover:bg-sunflower-dark text-foreground"
            >
              {sending ? t("events.dialog.sending") : t("events.dialog.submit")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-center">
              🎉 {t("events.toast.success")}
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {selectedEvent?.titolo}
            </DialogDescription>
          </DialogHeader>
          <Button
            className="w-full bg-sunflower hover:bg-sunflower-dark text-foreground mt-2"
            onClick={() => setSuccessOpen(false)}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
