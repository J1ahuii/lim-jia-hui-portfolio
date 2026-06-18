import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  AuroraStreaks,
  FloatingStars,
  SparkleParticles,
} from "@/components/portfolio/celestial";
import { SectionStar } from "@/components/portfolio/decor";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchLatestStarMessages,
  type StarMessage,
} from "@/components/portfolio/starMessages";
import bubble from "@/assets/bubble.png";

type WhispersSearch = { id?: string };

export const Route = createFileRoute("/whispers")({
  head: () => ({
    meta: [
      { title: "Whispers — Lim Jia Hui" },
      {
        name: "description",
        content:
          "A drifting constellation of short messages — Whispers across the stars by Lim Jia Hui.",
      },
      { property: "og:title", content: "Whispers — Lim Jia Hui" },
      {
        property: "og:description",
        content: "A drifting constellation of messages across the stars.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): WhispersSearch => {
    const id = search?.id;
    return typeof id === "string" && id.length > 0 ? { id } : {};
  },
  component: WhispersPage,
});

const MAX_DISPLAY = 12;

// Deterministic pseudo-random for stable orbit placement
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

type Placed = StarMessage & {
  // percentage-based positioning so it scales with viewport
  top: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
  drift: number;
};

function placeMessages(messages: StarMessage[]): Placed[] {
  return messages.map((m, i) => {
    const angle = (i / Math.max(messages.length, 1)) * Math.PI * 2 + rand(i + 1) * 0.6;
    // ring radius varies per message to avoid an obvious circle
    const radius = 28 + rand(i + 13) * 14; // 28% – 42% from center
    const cx = 50 + Math.cos(angle) * radius;
    const cy = 50 + Math.sin(angle) * radius * 0.78; // slightly flatter
    return {
      ...m,
      left: Math.max(4, Math.min(96, cx)),
      top: Math.max(8, Math.min(88, cy)),
      delay: rand(i + 27) * 2,
      duration: 9 + rand(i + 41) * 7,
      scale: 0.85 + rand(i + 53) * 0.45,
      drift: 10 + rand(i + 67) * 18,
    };
  });
}

function WhispersPage() {
  const { id: highlightId } = Route.useSearch();
  const [messages, setMessages] = useState<StarMessage[]>([]);
  const seenHighlight = useRef(false);

  useEffect(() => {
    fetchLatestStarMessages(MAX_DISPLAY).then(setMessages).catch(() => {});
    const channel = supabase
      .channel("star_messages_whispers")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "star_messages" },
        (payload) => {
          const m = payload.new as StarMessage;
          setMessages((prev) =>
            [m, ...prev.filter((p) => p.id !== m.id)].slice(0, MAX_DISPLAY),
          );
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (!highlightId || seenHighlight.current) return;
    if (messages.some((m) => m.id === highlightId)) {
      seenHighlight.current = true;
      toast.success("Your whisper is drifting…");
    }
  }, [highlightId, messages]);

  const placed = useMemo(() => placeMessages(messages), [messages]);

  return (
    <main className="relative min-h-screen overflow-hidden pb-40 pt-16 sm:pt-20">
      <AuroraStreaks variant="ribbon" />
      <FloatingStars count={28} seed={97} />
      <SparkleParticles count={36} seed={61} />

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-4 flex items-center gap-3">
          <SectionStar />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
            Constellation of Voices
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="font-editorial italic silver-foil"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
            lineHeight: 0.95,
            letterSpacing: "0.01em",
          }}
        >
          Whispers
        </motion.h1>
        <div
          className="mt-4 h-px w-28"
          style={{ background: "linear-gradient(90deg, var(--color-silver), transparent)" }}
        />
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-silver/70">
          A celestial installation of the latest twelve messages. Each whisper drifts in its
          own orbit around a quiet center — reserved for a butterfly yet to take flight.
        </p>
      </div>

      {/* Celestial installation stage */}
      <div className="relative mx-auto mt-12 h-[68vh] min-h-[520px] w-full max-w-6xl px-4">
        {/* Center reserved artwork slot (future 3D butterfly) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[260px] w-[260px] sm:h-[340px] sm:w-[340px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.74 0.16 230 / 0.35) 0%, oklch(0.66 0.22 295 / 0.2) 40%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 rounded-full border border-silver/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute inset-14 rounded-full border border-silver/10"
            />
            <div
  data-slot="butterfly-3d-mount"
  className="absolute inset-0 flex items-center justify-center"
>
  <motion.img
    src={bubble}
    alt="Bubble"
    className="
      w-[220px]
    sm:w-[300px]
    md:w-[360px]
    select-none
    pointer-events-none
    opacity-50
    "
    animate={{
      y: [0, -12, 0],
      rotate: [0, 2, 0, -2, 0],
      scale: [1, 1.03, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</div>
          </div>
        </div>

        {/* Drifting messages */}
        <AnimatePresence>
          {placed.map((m) => {
            const isHighlight = m.id === highlightId;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
                animate={{
                  opacity: isHighlight ? 1 : 0.75,
                  scale: 1,
                  filter: "blur(0px)",
                  y: [0, -m.drift, 0, m.drift * 0.6, 0],
                  x: [0, m.drift * 0.4, 0, -m.drift * 0.3, 0],
                }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
                transition={{
                  opacity: { duration: 1.2, delay: m.delay * 0.3 },
                  scale: { duration: 1.2, delay: m.delay * 0.3 },
                  filter: { duration: 1.2, delay: m.delay * 0.3 },
                  y: {
                    duration: m.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: m.delay,
                  },
                  x: {
                    duration: m.duration * 1.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: m.delay,
                  },
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `${m.top}%`,
                  left: `${m.left}%`,
                  fontSize: `${0.85 + m.scale * 0.4}rem`,
                }}
              >
                <span
                  className="font-editorial italic text-silver-bright"
                  style={{
                    textShadow: isHighlight
                      ? "0 0 18px oklch(0.74 0.16 230 / 0.9), 0 0 36px oklch(0.66 0.22 295 / 0.6)"
                      : "0 0 12px oklch(0.74 0.16 230 / 0.35)",
                    opacity: isHighlight ? 1 : 0.78,
                  }}
                >
                  {m.body}
                </span>
                {isHighlight && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.6], scale: [0.4, 1.2, 1] }}
                    transition={{ duration: 1.6 }}
                    className="ml-2 inline-block align-middle text-aurora"
                  >
                    <Sparkles className="inline h-3.5 w-3.5" />
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="absolute left-1/2 top-[78%] -translate-x-1/2 text-sm italic text-silver-dim">
            The sky is quiet. Whispers will appear here once sent from Contact.
          </div>
        )}
      </div>
    </main>
  );
}
