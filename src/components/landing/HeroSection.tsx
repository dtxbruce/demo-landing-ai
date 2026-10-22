import { motion } from "framer-motion";
import { MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { ElevenLabsAgent } from "./ElevenLabsAgent";
import { useT } from "@/lib/i18n";
import heroImg from "@/assets/hero-sunflowers.jpg";
import logo from "@/assets/datex-logo.png";
import managerPlaceholder from "@/assets/manager-placeholder.jpg";
import type { ManagerData } from "@/lib/manager-data";

interface HeroSectionProps {
  manager: ManagerData;
  codice: string;
}

export function HeroSection({ manager, codice }: HeroSectionProps) {
  const t = useT();
  const photo = manager.photo || managerPlaceholder;

  return (
    <section className="relative flex items-start overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Campo di girasoli" className="w-full h-full object-cover object-bottom" />
        <div className="absolute inset-0 bg-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-white/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-12 pb-16">
        {/* Top: Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <img src={logo} alt="Datex" className="h-20 mb-5" />
          <h1 className="text-3xl md:text-5xl font-display font-bold text-primary leading-tight mb-4">
            {t("hero.title")}{" "}
            <span className="text-gradient-sunflower">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-primary/90 text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Manager Card + Chat side by side */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Manager Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-[280px_1fr]">
              <div className="bg-gradient-navy p-8 flex flex-col items-center justify-center text-center">
                <img
                  src={photo}
                  alt={`${manager.firstName} ${manager.lastName}`}
                  className="w-36 h-36 rounded-full object-cover border-4 border-sunflower/30 mb-4"
                />
                <h3 className="text-xl font-display font-bold text-primary-foreground">
                  {manager.identificativo}
                </h3>
                <p className="flex items-center gap-1.5 text-primary-foreground/70 text-sm mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {manager.city}
                </p>
                {manager.socials && (
                  <div className="flex gap-3 mt-4">
                    {manager.socials.instagram && (
                      <a href={manager.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-sunflower transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {manager.socials.facebook && (
                      <a href={manager.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-sunflower transition-colors">
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {manager.socials.linkedin && (
                      <a href={manager.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-sunflower transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col justify-center">
                <p className="text-sm font-semibold text-sunflower-dark uppercase tracking-wider mb-2">
                  {t("hero.managerLabel")}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">{manager.bio}</p>
                <blockquote className="border-l-4 border-sunflower pl-4 italic text-foreground/80">
                  "{manager.welcomeMessage}"
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Chat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ElevenLabsAgent managerName={manager.identificativo} codiceAgente={codice} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
