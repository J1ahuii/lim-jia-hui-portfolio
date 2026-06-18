import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft , ImageIcon } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { SectionStar } from "@/components/portfolio/decor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  FloatingStars,
  AuroraStreaks,
  ConstellationField,
  SparkleParticles,
} from "@/components/portfolio/celestial";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = portfolio.projects.find((p) => p.slug === params.slug);
    const title = project ? `${project.title} — Lim Jia Hui` : "Project — Lim Jia Hui";
    const description = project?.overview ?? project?.description ?? "Project details.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const project = portfolio.projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetailPage,
  notFoundComponent: () => (
    <main className="relative grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
          Not found
        </p>
        <h1 className="mt-3 font-editorial italic silver-foil text-5xl">No such project</h1>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-silver hover:text-aurora">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
      </div>
    </main>
  ),
  errorComponent: ({ error, reset }) => (
    <main className="relative grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-editorial italic silver-foil text-4xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-silver/70">{error.message}</p>
        <button onClick={reset} className="mt-6 cosmic-badge px-4 py-2 text-sm text-silver-bright">
          Try again
        </button>
      </div>
    </main>
  ),
});

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <SectionStar />
      <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
        {label}
      </span>
    </div>
  );
}

function toEmbed(url: string): { kind: "youtube" | "mp4" | "none"; src: string } {
  if (!url) return { kind: "none", src: "" };

  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );

  if (yt)
    return {
      kind: "youtube",
      src: `https://www.youtube.com/embed/${yt[1]}`,
    };

  if (/\.mp4($|\?)/i.test(url))
    return { kind: "mp4", src: url };

  return { kind: "none", src: "" };
}

function ProjectDetailPage() {
  const loaderData = Route.useLoaderData();
  const project = loaderData.project;
  console.log(project);
  const gallery = project.gallery ?? [];
  const video = toEmbed(project.video ?? "");

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-40">
      <AuroraStreaks variant="default" />
      <FloatingStars count={22} seed={47} />
      <ConstellationField count={3} />
      <SparkleParticles count={20} seed={11} />

      <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-silver/80 transition-colors hover:text-aurora"
          >
            <ArrowLeft className="h-4 w-4" /> Projects
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9 }}
          className="mt-6 font-editorial italic silver-foil"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)", lineHeight: 0.95, letterSpacing: "0.01em" }}
        >
          {project.title}
        </motion.h1>
        <div
          className="mb-8 mt-4 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl text-base leading-relaxed text-silver/85"
        >
          {project.overview}
        </motion.p>


        {/* Gallery — horizontal carousel */}
        {gallery.length > 0 && (
          <section className="mt-20">
          <SectionLabel label="Project UI" />
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {(gallery.length ? gallery : [null, null, null]).map((src: string | null, i: number) => (
                <CarouselItem key={i} className="pl-4 basis-full">
  <div
    className="
      crystal-card
      relative
      overflow-hidden
      p-6
      flex
      items-center
      justify-center
    "
    style={{
      background:
        "radial-gradient(ellipse at 30% 25%, oklch(0.66 0.22 295 / 0.25), transparent 65%), oklch(0.16 0.06 270 / 0.6)",
    }}
  >
                    {src ? (
                      <img
  src={src}
  alt={`${project.title} screenshot ${i + 1}`}
  className="
    max-h-[75vh]
    max-w-full
    w-auto
    object-contain
    rounded-xl
  "
/>
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-silver/55">
                        <ImageIcon className="h-7 w-7" />
                        <span className="font-display silver-foil-static text-3xl opacity-60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="silver-border bg-[oklch(0.10_0.04_280_/_0.55)] text-silver-bright hover:[box-shadow:var(--glow-violet)]" />
            <CarouselNext className="silver-border bg-[oklch(0.10_0.04_280_/_0.55)] text-silver-bright hover:[box-shadow:var(--glow-violet)]" />
          </Carousel>
        </section>
        )}

        {video.kind === "youtube" && (
  <section className="mt-20">
    <SectionLabel label="Demo Video" />

    <div className="crystal-card overflow-hidden rounded-3xl">
      <iframe
        src={video.src}
        title={`${project.title} Demo`}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </section>
)}

        {/* Project description */}
        <section className="mt-20">
          <SectionLabel label="Project Description" />
          <div className="crystal-panel p-7">
            <p className="text-base leading-relaxed text-silver/85">
              {project.caseStudy ?? project.description}
            </p>
          </div>
        </section>

        {/* Tech stack */}
        <section className="mt-20">
          <SectionLabel label="Tech Stack" />
          <div className="flex flex-wrap gap-2">
            {[...project.techStack, ...(project.skills ?? [])].map((t: string) => (
              <span
                key={t}
                className="cosmic-badge px-3 py-1 text-xs font-medium text-silver-bright"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
