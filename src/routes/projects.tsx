import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { SectionStar } from "@/components/portfolio/decor";
import { WinsSection } from "@/components/portfolio/WinsSection";
import { CertificatesSection } from "@/components/portfolio/CertificatesSection";
import { SiteLogo } from "@/components/portfolio/SiteLogo";
import {
  FloatingStars,
  AuroraStreaks,
  ConstellationField,
  SparkleParticles,
} from "@/components/portfolio/celestial";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Lim Jia Hui" },
      { name: "description", content: "Selected projects, achievements and credentials, set against a celestial backdrop." },
      { property: "og:title", content: "Projects — Lim Jia Hui" },
      { property: "og:description", content: "Selected projects, achievements and credentials." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const isOverview = useRouterState({ select: (state) => state.location.pathname === "/projects" });

  if (!isOverview) {
    return <Outlet />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-40">
      <SiteLogo />
      <AuroraStreaks variant="default" />
      <FloatingStars count={22} seed={31} />
      <ConstellationField count={3} />
      <SparkleParticles count={24} seed={17} />

      <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-3"
        >
          <SectionStar />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
            Selected Work
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="font-editorial italic silver-foil"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", lineHeight: 0.95, letterSpacing: "0.01em" }}
        >
          Projects
        </motion.h1>
        <div
          className="mb-14 mt-4 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="crystal-card light-sweep group relative flex flex-col transition-shadow duration-500 hover:[box-shadow:var(--glow-prism)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
  <img
    src={project.image}
    alt={project.title}
    className="
      h-full
      w-full
      object-cover
      transition-all
      duration-700
      group-hover:scale-110
    "
  />

  {/* Overlay */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1))",
    }}
  />

</div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-editorial italic text-2xl text-silver-bright">
                  {project.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver/80">
                  {project.description}
                </p>
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="mt-5 inline-flex w-fit items-center gap-1 border-b border-silver/40 pb-0.5 text-sm font-medium text-silver transition-colors hover:border-aurora hover:text-aurora"
                >
                  View Details <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <WinsSection />
        <CertificatesSection />
      </div>
    </main>
  );
}
