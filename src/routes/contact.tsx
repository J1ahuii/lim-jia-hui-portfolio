import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { portfolio } from "@/content/portfolio";
import { SectionStar, Sparkle } from "@/components/portfolio/decor";
import {
  AuroraStreaks,
  FloatingStars,
  SparkleParticles,
} from "@/components/portfolio/celestial";
import { StarMessagesSection } from "@/components/portfolio/StarMessagesSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lim Jia Hui" },
      { name: "description", content: "Send a message across the stars — email, socials and a contact form." },
      { property: "og:title", content: "Contact — Lim Jia Hui" },
      { property: "og:description", content: "Email, socials and contact form." },
    ],
  }),
  component: ContactPage,
});

type LinkItem = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
};

function ContactPage() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent across the stars.");
    }, 700);
  };

  const links: LinkItem[] = [
    { icon: Mail, label: "Email", value: portfolio.contact.email },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com", href: portfolio.socials.linkedin },
    { icon: Github, label: "GitHub", value: "github.com", href: portfolio.socials.github },
    { icon: Instagram, label: "Instagram", value: "instagram.com", href: portfolio.socials.instagram },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-40 pt-16 sm:pt-20">
      <AuroraStreaks variant="ribbon" />
      <FloatingStars count={18} seed={51} />
      <SparkleParticles count={26} seed={23} />

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-4 flex items-center gap-3">
          <SectionStar />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
            Let's Talk
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="font-editorial italic silver-foil"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", lineHeight: 0.95, letterSpacing: "0.01em" }}
        >
          Contact
        </motion.h1>
        <div
          className="mb-14 mt-4 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="crystal-panel p-7 sm:p-9"
          >
            <p className="font-editorial italic text-silver-bright text-lg">
              Have a project, opportunity, or just want to say hi?
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-silver/80">
              Drop a message — I read every one and reply soon.
            </p>
            <ul className="mt-8 space-y-3">
              {links.map(({ icon: Icon, label, value, href }) => {
                const rowClass =
                  "group flex items-center gap-4 rounded-2xl silver-border px-5 py-4 transition-all";
                const interactive =
                  "cursor-pointer hover:-translate-y-0.5 hover:[box-shadow:var(--glow-aurora)]";
                const inner = (
                  <>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full cosmic-badge text-silver-bright transition-all group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-silver-dim">
                        {label}
                      </span>
                      <span className="text-sm font-medium text-silver-bright break-all">
                        {value}
                      </span>
                    </span>
                    {href && (
                      <Sparkle
                        className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        color="lavender"
                        size={14}
                      />
                    )}
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${rowClass} ${interactive}`}
                        style={{ background: "oklch(0.16 0.06 270 / 0.45)" }}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        className={`${rowClass} cursor-default`}
                        style={{ background: "oklch(0.16 0.06 270 / 0.45)" }}
                      >
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="crystal-panel space-y-5 p-7 sm:p-9"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-semibold uppercase tracking-[0.3em] text-silver">
                Name
              </Label>
              <Input
                id="name" name="name" required placeholder="Your name"
                className="border-silver/30 bg-transparent text-silver-bright placeholder:text-silver-dim/70 focus-visible:ring-violet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-[0.3em] text-silver">
                Email
              </Label>
              <Input
                id="email" name="email" type="email" required placeholder="you@email.com"
                className="border-silver/30 bg-transparent text-silver-bright placeholder:text-silver-dim/70 focus-visible:ring-violet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-[10px] font-semibold uppercase tracking-[0.3em] text-silver">
                Message
              </Label>
              <Textarea
                id="message" name="message" required rows={5} placeholder="Say hi…"
                className="border-silver/30 bg-transparent text-silver-bright placeholder:text-silver-dim/70 focus-visible:ring-violet"
              />
            </div>
            <Button
              type="submit"
              disabled={sending}
              className="w-full border-0 text-silver-bright transition-all hover:[box-shadow:var(--glow-aurora)]"
              style={{
                background:
                  "linear-gradient(120deg, oklch(0.66 0.22 295 / 0.7), oklch(0.74 0.16 230 / 0.7))",
                border: "1px solid oklch(0.86 0.015 270 / 0.45)",
              }}
            >
              {sending ? "Sending…" : (
                <>
                  Send across the stars <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>

      <StarMessagesSection />
    </main>
  );
}
