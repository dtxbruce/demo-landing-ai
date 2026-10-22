import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import type { ManagerVideo } from "@/lib/manager-data";
import { useT } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface VideoSectionProps {
  videos: ManagerVideo[];
}

function VideoCard({ video, index }: { video: ManagerVideo; index: number }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="bg-background rounded-2xl p-6 border border-border hover:border-sunflower/30 transition-all group h-full flex flex-col"
    >
      <div className="w-10 h-10 rounded-xl bg-sunflower/10 flex items-center justify-center shrink-0 group-hover:bg-sunflower/20 transition-colors mb-4">
        <PlayCircle className="w-5 h-5 text-sunflower-dark" />
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
        {video.description}
      </p>
    </motion.a>
  );
}

export function VideoSection({ videos }: VideoSectionProps) {
  const t = useT();

  if (videos.length === 0) return null;

  const useSlider = videos.length > 3;

  return (
    <section id="video" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            <span className="text-gradient-sunflower">{t("videos.titleHighlight")}</span> {t("videos.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("videos.subtitle")}
          </p>
        </motion.div>

        {useSlider ? (
          <div className="max-w-5xl mx-auto">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {videos.map((video, i) => (
                  <CarouselItem key={video.url} className="md:basis-1/3">
                    <VideoCard video={video} index={i} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          <div
            className={`grid gap-8 max-w-5xl mx-auto ${
              videos.length === 1
                ? "md:grid-cols-1 max-w-md"
                : videos.length === 2
                ? "md:grid-cols-2 max-w-3xl"
                : "md:grid-cols-3"
            }`}
          >
            {videos.map((video, i) => (
              <VideoCard key={video.url} video={video} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
