import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import butterfly from "@/assets/moon.png";

export function CrystalButterfly() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * -12;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: [-12, 12, -12],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative flex items-center justify-center"
    >
      {/* Cosmic Glow */}
      <div
        className="absolute inset-0 blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(170,120,255,0.55), rgba(120,200,255,0.25), transparent 75%)",
        }}
      />

      {/* Wing Sparkles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${20 + Math.random() * 60}%`,
            top: `${15 + Math.random() * 70}%`,
            boxShadow: "0 0 10px rgba(255,255,255,0.9)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 2, 0.5],
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Stardust Trail */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{
            width: 3,
            height: 3,
            background:
              i % 2 === 0
                ? "rgba(255,255,255,0.9)"
                : "rgba(180,140,255,0.8)",
            left: `${45 + Math.random() * 10}%`,
            top: `${55 + i * 3}%`,
            boxShadow: "0 0 12px rgba(180,140,255,0.8)",
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 40],
            x: [0, (Math.random() - 0.5) * 40],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}

      {/* Butterfly */}
      <motion.img
        src={butterfly}
        alt="Crystal Butterfly"
        draggable={false}
        whileHover={{
          scale: 1.08,
          rotateZ: 1,
          filter: `
            drop-shadow(0 0 40px rgba(255,255,255,0.8))
            drop-shadow(0 0 80px rgba(180,120,255,0.6))
            drop-shadow(0 0 120px rgba(120,220,255,0.5))
          `,
        }}
        className="
          relative
          z-10
          select-none
          pointer-events-auto
          w-[260px]
          md:w-[340px]
          lg:w-[420px]
        "
        animate={{
          scale: [1, 1.03, 1],
          rotateZ: [-1, 1, -1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: `
            drop-shadow(0 0 30px rgba(255,255,255,0.55))
            drop-shadow(0 0 60px rgba(180,120,255,0.40))
            drop-shadow(0 0 100px rgba(120,220,255,0.30))
          `,
        }}
      />
    </motion.div>
  );
}