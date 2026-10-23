import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

export function ChiSiamoSection() {
  const t = useT();

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            {t("about.title")} <span className="text-gradient-sunflower">Aurelia</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {t("about.p1")}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {t("about.p2")}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            <a href="/i-nostri-prodotti" target="_blank" rel="noopener noreferrer">
              {t("about.cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
