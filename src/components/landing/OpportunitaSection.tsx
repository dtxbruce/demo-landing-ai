import { motion } from "framer-motion";
import { TrendingUp, Users, GraduationCap, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

export function OpportunitaSection() {
  const t = useT();

  const benefits = [
    { icon: Wallet, title: t("opp.income.title"), description: t("opp.income.desc") },
    { icon: TrendingUp, title: t("opp.growth.title"), description: t("opp.growth.desc") },
    { icon: Users, title: t("opp.support.title"), description: t("opp.support.desc") },
    { icon: GraduationCap, title: t("opp.training.title"), description: t("opp.training.desc") },
  ];

  return (
    <section id="opportunita" className="py-20 bg-gradient-navy text-primary-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t("opp.title")}<span className="text-gradient-sunflower">{t("opp.titleHighlight")}</span> {t("opp.titleEnd")}
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            {t("opp.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/10 hover:border-sunflower/30 transition-colors"
            >
              <b.icon className="w-8 h-8 text-sunflower mb-4" />
              <h3 className="text-lg font-display font-semibold mb-2">{b.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button
            asChild
            size="lg"
            className="bg-sunflower text-accent-foreground hover:bg-sunflower-dark shadow-sunflower font-semibold"
          >
            <Link to="/piano-marketing">
              {t("opp.cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
