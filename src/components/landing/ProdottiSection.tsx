import { motion } from "framer-motion";
import { ArrowRight, Leaf, Heart, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

export function ProdottiSection() {
  const t = useT();

  const products = [
    {
      icon: Leaf,
      title: t("products.natural.title"),
      description: t("products.natural.desc"),
    },
    {
      icon: Heart,
      title: t("products.vitality.title"),
      description: t("products.vitality.desc"),
    },
    {
      icon: Dog,
      title: t("products.pet.title"),
      description: t("products.pet.desc"),
    },
  ];

  return (
    <section id="prodotti" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t("products.title")} <span className="text-gradient-sunflower">{t("products.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-border group"
            >
              <div className="w-14 h-14 rounded-xl bg-sunflower/10 flex items-center justify-center mb-5 group-hover:bg-sunflower/20 transition-colors">
                <product.icon className="w-7 h-7 text-sunflower-dark" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{product.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-sunflower text-accent-foreground hover:bg-sunflower-dark shadow-sunflower font-semibold"
          >
            <a href="https://sunflowers25.com/i-nostri-prodotti/" target="_blank" rel="noopener noreferrer">
              {t("products.cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
