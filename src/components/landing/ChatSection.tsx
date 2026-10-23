import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export function ChatSection() {
  const [chatMessage, setChatMessage] = useState("");

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-primary/90 backdrop-blur-lg rounded-2xl border-2 border-sunflower/30 p-6 max-w-2xl mx-auto shadow-[0_8px_40px_-8px_hsl(var(--sunflower)/0.3)]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-sunflower/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-sunflower" />
            </div>
            <div>
              <p className="text-primary-foreground font-semibold text-sm">Assistente Aurelia</p>
              <p className="text-primary-foreground/50 text-xs">Online</p>
            </div>
          </div>

          <div className="bg-primary/40 rounded-xl p-5 mb-4 min-h-[260px] space-y-3">
            <div className="bg-primary-foreground/10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
              <p className="text-primary-foreground/90 text-sm">
                Ciao! 👋 Benvenuto in Aurelia. Sono il tuo assistente virtuale.
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
              <p className="text-primary-foreground/90 text-sm">
                Puoi chiedermi informazioni sui nostri <strong>prodotti</strong>, sulla <strong>nostra azienda</strong> o sulle <strong>opportunità di carriera</strong>. Come posso aiutarti?
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Scrivi un messaggio..."
              className="flex-1 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 rounded-lg px-4 py-3 text-sm border-none outline-none focus:ring-1 focus:ring-sunflower/50"
            />
            <button className="bg-sunflower hover:bg-sunflower-dark text-accent-foreground rounded-lg p-3 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
