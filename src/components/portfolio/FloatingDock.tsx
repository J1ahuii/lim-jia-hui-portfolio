import { Link } from "@tanstack/react-router";
import { Home, FolderKanban, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/projects", label: "Projects", icon: FolderKanban, exact: false },
  { to: "/others", label: "Others", icon: Sparkles, exact: false },
  { to: "/contact", label: "Contact", icon: Send, exact: false },
] as const;

export function FloatingDock() {
  return (
    <nav
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
      aria-label="Primary"
    >
      <ul
        className={cn(
          "relative flex items-center gap-1 rounded-full px-2.5 py-2 sm:gap-1.5 sm:px-3",
          "crystal-panel"
        )}
        style={{
          // tighten the panel for a pill-shaped dock
          borderRadius: 9999,
        }}
      >
        {items.map(({ to, label, icon: Icon, exact }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact }}
              aria-label={label}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="group relative block"
            >
              {({ isActive }) => (
                <span
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-[11px]",
                    isActive
                      ? "text-silver-bright"
                      : "text-silver-dim group-hover:text-silver-bright"
                  )}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(120deg, oklch(0.66 0.22 295 / 0.35), oklch(0.74 0.16 230 / 0.35))",
                          boxShadow:
                            "0 0 18px oklch(0.66 0.22 295 / 0.55), inset 0 1px 0 oklch(0.96 0.012 270 / 0.35)",
                        }
                      : undefined
                  }
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{label}</span>

                  {/* Floating indicator star above active */}
                  {isActive && (
                    <span
                      className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 animate-float-soft"
                      style={{ animationDuration: "3s" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M12 0 L13.2 9.4 L24 12 L13.2 14.6 L12 24 L10.8 14.6 L0 12 L10.8 9.4 Z"
                          fill="oklch(0.96 0.012 270)"
                        />
                      </svg>
                    </span>
                  )}

                  {/* Hover sparkle */}
                  <span className="pointer-events-none absolute -right-0.5 -top-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                    <svg width="8" height="8" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M10 0 L11 9 L20 10 L11 11 L10 20 L9 11 L0 10 L9 9 Z" fill="oklch(0.82 0.10 300)" />
                    </svg>
                  </span>
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
