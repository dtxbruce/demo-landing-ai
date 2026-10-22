import logo from "@/assets/sunflowers-logo.png";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();

  return (
    <footer className="bg-gradient-navy py-10">
      <div className="container mx-auto px-6 text-center">
        <img src={logo} alt="STONE MLM DEMO" className="h-10 mx-auto mb-4 brightness-0 invert" />
        <p className="text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} STONE MLM DEMO Europe |{" "}
          <a
            href="https://sunflowers25.com/termini-e-condizioni-di-vendita/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sunflower transition-colors"
          >
            {t("footer.terms")}
          </a>
        </p>
      </div>
    </footer>
  );
}
