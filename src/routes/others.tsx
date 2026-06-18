import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, Briefcase } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { SectionStar } from "@/components/portfolio/decor";
import { SiteLogo } from "@/components/portfolio/SiteLogo";
import {
  AuroraStreaks,
  FloatingStars,
  SparkleParticles,
} from "@/components/portfolio/celestial";
const IMAGES = {
  photography: "/others/photo.jpg",
  experience: "/others/working.jpg",
};

export const Route = createFileRoute("/others")({

  head: () => ({
    meta: [
      { title: "Others — Lim Jia Hui" },
      { name: "description", content: "Beyond the code — photography and working experience, mapped across the stars." },
      { property: "og:title", content: "Others — Lim Jia Hui" },
      { property: "og:description", content: "Photography and working experience." },
    ],
  }),
  component: OthersPage,
});

const ICONS: Record<string, typeof Camera> = {
  photography: Camera,
  experience: Briefcase,
};

function OthersPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/others") {
    return <Outlet />;
  }
  return (
    <main className="relative min-h-screen overflow-x-hidden pb-40">

      <SiteLogo />
      <AuroraStreaks variant="default" />
      <FloatingStars count={16} seed={71} />
      <SparkleParticles count={20} seed={29} />

      <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <div className="mb-4 flex items-center gap-3">
          <SectionStar />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
            Beyond Code
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="font-editorial italic silver-foil"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", lineHeight: 0.95, letterSpacing: "0.01em" }}
        >
          Others
        </motion.h1>
        <div
          className="mb-14 mt-4 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />

        <div className="grid gap-10 md:grid-cols-2">
          {portfolio.others.map((item, i) => {
            const Icon = ICONS[item.key] ?? Camera;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.9, delay: i * 0.15 }}
                className="relative"
              >
                <Link
                  to={item.href}
                  className="crystal-card light-sweep group block transition-all duration-500 hover:-translate-y-2 hover:[box-shadow:var(--glow-prism)]"
                >
                 <div className="relative aspect-[5/4] overflow-hidden">
  <img
  src={IMAGES[item.key as keyof typeof IMAGES]}
  alt={item.title}
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
/>

  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(to top, rgba(5,8,20,0.65), transparent 55%)",
    }}
  />
</div>
                  <div className="flex items-end justify-between gap-6 p-7">
                    <div>
                      <h2 className="font-editorial italic silver-foil-static text-3xl">
                        {item.title}
                      </h2>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-silver/80">
                        {item.description}
                      </p>
                    </div>
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full silver-border text-silver-bright transition-all group-hover:[box-shadow:var(--glow-violet)]">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
