import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();

  return (
    <footer className="bg-gradient-navy py-10">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-2xl font-semibold text-primary-foreground mb-4 tracking-tight">
          Aurelia
        </p>
        <p className="text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} Aurelia Wellness
        </p>
      </div>
    </footer>
  );
}
