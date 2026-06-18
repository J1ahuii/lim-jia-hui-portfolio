import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionStar } from "@/components/portfolio/decor";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchLatestStarMessages,
  postStarMessage,
  type StarMessage,
} from "./starMessages";

const MAX = 80;

function relTime(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export function StarMessagesSection() {
  const [messages, setMessages] = useState<StarMessage[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestStarMessages().then(setMessages).catch(() => {});
    const channel = supabase
      .channel("star_messages_contact")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "star_messages" },
        (payload) => {
          const m = payload.new as StarMessage;
          setMessages((prev) => [m, ...prev.filter((p) => p.id !== m.id)].slice(0, 12));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      const m = await postStarMessage(trimmed);
      setMessages((prev) => [m, ...prev.filter((p) => p.id !== m.id)].slice(0, 12));
      setText("");
      setJustSent(true);
      toast.success("Your message joined the stars.");
      setTimeout(() => {
        navigate({ to: "/whispers", search: { id: m.id } });
      }, 1400);
    } catch {
      toast.error("Couldn't send your message. Try again.");
      setSending(false);
    }
  };

  return (
    <section className="mx-auto mt-28 max-w-6xl px-6 sm:px-10">
      <div className="mb-4 flex items-center gap-3">
        <SectionStar />
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-aurora">
          Whisper to the Sky
        </span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="font-editorial italic silver-foil"
        style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1, letterSpacing: "0.01em" }}
      >
        Messages Across The Stars
      </motion.h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-silver/70">
        Leave a short note (max 80 characters). The latest twelve drift through the Whispers constellation.
      </p>

      <form
        onSubmit={handleSubmit}
        className="crystal-panel relative mt-8 flex flex-col gap-3 overflow-hidden p-5 sm:flex-row sm:items-center sm:p-6"
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX))}
          placeholder="A thought, a wish, a hello…"
          maxLength={MAX}
          disabled={sending}
          className="border-silver/30 bg-transparent text-silver-bright placeholder:text-silver-dim/70 focus-visible:ring-violet"
        />
        <div className="flex items-center gap-3 sm:shrink-0">
          <span className="text-[10px] uppercase tracking-[0.3em] text-silver-dim tabular-nums">
            {text.length}/{MAX}
          </span>
          <Button
            type="submit"
            disabled={sending || !text.trim()}
            className="border-0 text-silver-bright transition-all hover:[box-shadow:var(--glow-aurora)]"
            style={{
              background:
                "linear-gradient(120deg, oklch(0.66 0.22 295 / 0.7), oklch(0.74 0.16 230 / 0.7))",
              border: "1px solid oklch(0.86 0.015 270 / 0.45)",
            }}
          >
            {sending ? "Sending…" : (<>Send Across The Stars <Send className="ml-2 h-4 w-4" /></>)}
          </Button>
        </div>

        <AnimatePresence>
          {justSent && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{ background: "oklch(0.16 0.06 270 / 0.7)", backdropFilter: "blur(6px)" }}
            >
              <motion.div
                initial={{ scale: 0.4, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-3 text-silver-bright"
              >
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="font-editorial italic text-lg">Drifting into the stars…</span>
                <Sparkles className="h-5 w-5 animate-pulse" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>


      <ul className="mt-10 flex flex-wrap gap-3">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              transition={{ duration: 0.6, delay: i * 0.03 }}
              className="silver-border rounded-full px-4 py-2 text-[13px] text-silver-bright/90"
              style={{ background: "oklch(0.16 0.06 270 / 0.45)" }}
            >
              <span className="font-editorial italic">{m.body}</span>
              <span className="ml-2 text-[10px] uppercase tracking-[0.25em] text-silver-dim">
                {relTime(m.created_at)}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
        {messages.length === 0 && (
          <li className="text-sm text-silver-dim italic">Be the first star.</li>
        )}
      </ul>
    </section>
  );
}
