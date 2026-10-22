import { motion } from "framer-motion";
import { Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import type { ManagerData } from "@/lib/manager-data";
import { useT } from "@/lib/i18n";

interface ContattiSectionProps {
  manager: ManagerData;
}

export function ContattiSection({ manager }: ContattiSectionProps) {
  const t = useT();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: manager.email,
          senderName: form.name,
          senderEmail: form.email,
          senderPhone: form.phone,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      if (data.fallback === "mailto") {
        const mailtoUrl = `mailto:${encodeURIComponent(data.to)}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
        window.open(mailtoUrl, "_blank");
        toast.info(t("contact.toast.mailto"));
      } else {
        toast.success(t("contact.toast.success"));
      }

      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error(t("contact.toast.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contatti" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t("contact.title")} <span className="text-gradient-sunflower">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {manager.calendarUrl && (
              <a
                href={manager.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-sunflower/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-sunflower/10 flex items-center justify-center group-hover:bg-sunflower/20 transition-colors">
                  <Phone className="w-6 h-6 text-sunflower-dark" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("contact.call")}</p>
                  <p className="text-sm text-muted-foreground">{t("contact.callDesc")}</p>
                </div>
              </a>
            )}

            {manager.whatsappNumber && (
              <a
                href={`https://wa.me/${manager.whatsappNumber.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-sunflower/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-sunflower/10 flex items-center justify-center group-hover:bg-sunflower/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-sunflower-dark" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t("contact.whatsapp")}</p>
                  <p className="text-sm text-muted-foreground">{t("contact.whatsappDesc")}</p>
                </div>
              </a>
            )}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
          >
            <h3 className="text-lg font-display font-semibold text-foreground mb-6">{t("contact.formTitle")}</h3>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder={t("contact.name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-sunflower/40 focus:border-sunflower/40 outline-none transition-all"
              />
              <input
                type="email"
                required
                placeholder={t("contact.email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-sunflower/40 focus:border-sunflower/40 outline-none transition-all"
              />
              <input
                type="tel"
                required
                placeholder={t("contact.phone")}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-sunflower/40 focus:border-sunflower/40 outline-none transition-all"
              />
              <textarea
                placeholder={t("contact.message")}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-sunflower/40 focus:border-sunflower/40 outline-none transition-all resize-none"
              />
              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="w-full bg-sunflower text-accent-foreground hover:bg-sunflower-dark shadow-sunflower font-semibold"
              >
                <Send className="w-4 h-4 mr-2" />
                {sending ? t("contact.sending") : t("contact.submit")}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
