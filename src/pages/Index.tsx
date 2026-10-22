import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchManagerData, getDefaultManager, type ManagerData } from "@/lib/manager-data";
import { useLang, SUPPORTED_LANGS, type Lang } from "@/lib/i18n";
import { HeroSection } from "@/components/landing/HeroSection";
import { ChiSiamoSection } from "@/components/landing/ChiSiamoSection";
import { ProdottiSection } from "@/components/landing/ProdottiSection";
import { OpportunitaSection } from "@/components/landing/OpportunitaSection";
import { EventiSection } from "@/components/landing/EventiSection";
import { VideoSection } from "@/components/landing/VideoSection";
import { ContattiSection } from "@/components/landing/ContattiSection";
import { Footer } from "@/components/landing/Footer";
import { Globe } from "lucide-react";

const Index = () => {
  const [searchParams] = useSearchParams();
  const isPublished = !import.meta.env.DEV;
  const codice = searchParams.get("codice") || (isPublished ? "" : "f4f2b76baab04a5ba53005ae8");
  const [manager, setManager] = useState<ManagerData | null>(null);
  const [loading, setLoading] = useState(!!codice);
  const [error, setError] = useState(!codice);
  const lang = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!codice) return;
    fetchManagerData(codice)
      .then(setManager)
      .catch((err) => {
        console.error("Errore caricamento agente:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [codice]);

  const switchLang = (newLang: Lang) => {
    const basePath = newLang === "it" ? "/" : `/${newLang}`;
    const qs = location.search;
    navigate(`${basePath}${qs}`);
  };

  if (error || (!loading && !manager)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-muted-foreground font-semibold">Codice Agente non valido</p>
      </div>
    );
  }

  if (loading || !manager) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!manager.active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-muted-foreground font-semibold">Pagina non attiva</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Language Switcher - floating top right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-lg border border-border">
        <Globe className="w-3.5 h-3.5 text-muted-foreground mr-1" />
        {SUPPORTED_LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => switchLang(l.code)}
            className={`text-sm px-2 py-1 rounded-full transition-colors ${
              lang === l.code
                ? "bg-sunflower/20 font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            title={l.label}
          >
            {l.flag}
          </button>
        ))}
      </div>

      <HeroSection manager={manager} codice={manager.id} />
      <EventiSection agentId={manager.id} />
      <VideoSection videos={manager.videos} />
      <ContattiSection manager={manager} />
      <ChiSiamoSection />
      <ProdottiSection />
      <OpportunitaSection />
      <Footer />
    </div>
  );
};

export default Index;
