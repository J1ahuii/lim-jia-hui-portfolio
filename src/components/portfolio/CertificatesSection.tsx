import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ChevronRight, ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SectionStar } from "@/components/portfolio/decor";
import { FloatingStars, AuroraStreaks } from "@/components/portfolio/celestial";
import { portfolio } from "@/content/portfolio";


type Certificate = (typeof portfolio.certificates)[number];

export function CertificatesSection() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section className="relative mt-28">
      <AuroraStreaks variant="ribbon" />
      <FloatingStars count={14} seed={151} />
      <div className="mb-4 flex items-center gap-3">
        <SectionStar />
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
          Credentials
        </span>
      </div>
      <h2
        className="font-editorial italic silver-foil"
        style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: 1, letterSpacing: "0.01em" }}
      >
        Certificates
      </h2>
      <div
        className="mb-10 mt-4 h-px w-28"
        style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
      />

      <div className="crystal-panel overflow-hidden">
        <ul className="divide-y divide-silver/10">
          {portfolio.certificates.map((cert, i) => (
            <motion.li
              key={cert.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                type="button"
                onClick={() => setSelected(cert)}
                className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[oklch(0.20_0.06_280_/_0.35)] sm:px-7 sm:py-5"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full silver-border"
                  style={{ background: "oklch(0.14 0.05 275 / 0.6)" }}
                >
                  <Award className="h-4 w-4 text-silver-bright" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-editorial italic text-base leading-tight text-silver-bright sm:text-lg">
                    {cert.title}
                  </span>
                  <span className="mt-0.5 truncate text-xs text-silver/70 sm:text-sm">
                    {cert.organization}
                  </span>
                </span>
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-aurora sm:inline">
                  {cert.date}
                </span>
                <ChevronRight className="h-4 w-4 text-silver/60 transition-transform group-hover:translate-x-0.5 group-hover:text-aurora" />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl border-0 bg-transparent p-0 shadow-none sm:rounded-3xl [&>button]:hidden">
          {selected && (
            <div className="crystal-panel overflow-hidden">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 25%, oklch(0.66 0.22 295 / 0.30), transparent 60%), oklch(0.14 0.05 275 / 0.7)",
                }}
              >
                {selected.image ? (
  selected.image.endsWith(".pdf") ? (
    <iframe
      src={selected.image}
      title={selected.title}
      className="h-full w-full bg-white"
    />
  ) : (
    <img
      src={selected.image}
      alt={selected.title}
      className="h-full w-full object-contain"
    />
  )
) : (
  <div className="flex h-full w-full items-center justify-center">
    <Award className="h-20 w-20 text-silver/40" />
  </div>
)}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full silver-border text-silver-bright backdrop-blur transition hover:[box-shadow:var(--glow-violet)]"
                  style={{ background: "oklch(0.10 0.04 280 / 0.55)" }}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-7">
                <DialogTitle
                  className="font-editorial italic silver-foil"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", lineHeight: 1.1 }}
                >
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-base text-silver/80">
                  {selected.organization}
                </DialogDescription>

                <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.3em] text-aurora">
                      Issue Date
                    </dt>
                    <dd className="mt-1 text-sm text-silver-bright">
                      {selected.issueDate || selected.date}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.3em] text-aurora">
                      Credential ID
                    </dt>
                    <dd className="mt-1 text-sm text-silver-bright">
                      {selected.credentialId || "—"}
                    </dd>
                  </div>
                </dl>

                {selected.verificationUrl ? (
                  <a
                    href={selected.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 cosmic-badge px-3 py-1.5 text-xs font-medium text-silver-bright transition hover:[box-shadow:var(--glow-violet)]"
                  >
                    Verify credential <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
