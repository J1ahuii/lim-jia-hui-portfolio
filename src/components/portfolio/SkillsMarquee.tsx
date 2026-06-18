import { portfolio } from "@/content/portfolio";
import { SectionStar } from "./decor";
import {
  Code2,
  FileCode,
  Coffee,
  FileType,
  Palette,
  Image as ImageIcon,
  Database,
  FileText,
  Braces,
  Brush,
  Layers,
  Globe,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "C++": Code2,
  Python: FileCode,
  Java: Coffee,
  JavaScript: Braces,
  TypeScript: FileType,
  React: Globe,
  HTML: FileText,
  CSS: Brush,
  Figma: Layers,
  Photoshop: ImageIcon,
  Canva: Palette,
  MySQL: Database,
  "Microsoft Office": FileText,
};

export function SkillsMarquee() {
  const track = [...portfolio.skills, ...portfolio.skills];

  return (
    <section className="relative py-24">
      <div className="mb-12 px-6 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <SectionStar />
          <h2 className="font-editorial italic silver-foil text-3xl sm:text-4xl">
            Technical Skills
          </h2>
        </div>
        <div
          className="mx-auto mt-3 h-px w-28 max-w-6xl"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />
      </div>

      <div
        className="relative crystal-ribbon py-8"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused]">
          {track.map((skill, i) => {
            const Icon = iconMap[skill] ?? Code2;
            return (
              <div
                key={`${skill}-${i}`}
                className="flex w-28 flex-shrink-0 flex-col items-center gap-3"
              >
                <div className="cosmic-badge flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 hover:[box-shadow:var(--glow-violet)]">
                  <Icon className="h-9 w-9 text-silver-bright" />
                </div>
                <span className="text-center text-xs font-medium tracking-wide text-silver">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
