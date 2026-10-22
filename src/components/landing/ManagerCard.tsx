import { motion } from "framer-motion";
import { MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import type { ManagerData } from "@/lib/manager-data";
import managerPlaceholder from "@/assets/manager-placeholder.jpg";

interface ManagerCardProps {
  manager: ManagerData;
}

export function ManagerCard({ manager }: ManagerCardProps) {
  const photo = manager.photo || managerPlaceholder;

  return (
    <section className="py-20 bg-gradient-lavender">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-[280px_1fr]">
            <div className="bg-gradient-navy p-8 flex flex-col items-center justify-center text-center">
              <img
                src={photo}
                alt={`${manager.firstName} ${manager.lastName}`}
                className="w-36 h-36 rounded-full object-cover border-4 border-sunflower/30 mb-4"
              />
              <h3 className="text-xl font-display font-bold text-primary-foreground">
                {manager.firstName} {manager.lastName}
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
                Il tuo Manager Sunflowers
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">{manager.bio}</p>
              <blockquote className="border-l-4 border-sunflower pl-4 italic text-foreground/80">
                "{manager.welcomeMessage}"
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
