import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { MottoSection } from "@/components/portfolio/MottoSection";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { SkillsMarquee } from "@/components/portfolio/SkillsMarquee";
import { SiteLogo } from "@/components/portfolio/SiteLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lim Jia Hui — Portfolio" },
      {
        name: "description",
        content:
          "Personal portfolio of Lim Jia Hui — projects, skills and stories with silver typography and aurora glow.",
      },
      { property: "og:title", content: "Lim Jia Hui — Portfolio" },
      {
        property: "og:description",
        content: "Projects, skills and stories drifting across a silver-and-violet galaxy.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <SiteLogo />
      <HeroSection />
      <MottoSection />
      <AboutSection />
      <EducationSection />
      <SkillsMarquee />
    </main>
  );
}
