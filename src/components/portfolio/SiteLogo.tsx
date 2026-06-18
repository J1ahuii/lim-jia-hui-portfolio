import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { portfolio } from "@/content/portfolio";

export function SiteLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
      className="relative z-20 w-full px-6 pt-7 sm:px-10 sm:pt-8"
    >
      <Link
        to="/"
        aria-label={`${portfolio.name} — return to home`}
        className="inline-block select-none"
      >
        <span
          className="font-editorial silver-foil block uppercase leading-none text-[2rem] sm:text-[2.4rem] md:text-[2.9rem]"
          style={{
            letterSpacing: "0.38em",
            textShadow:
              "0 0 18px oklch(0.92 0.012 270 / 0.55), 0 0 38px oklch(0.78 0.04 285 / 0.35), 0 0 70px oklch(0.66 0.22 295 / 0.18)",
          }}
        >
          {portfolio.name}
        </span>
      </Link>
    </motion.div>
  );
}
