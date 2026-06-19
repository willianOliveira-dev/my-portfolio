import { motion } from "motion/react";

export function ChatTypingIndicator() {
  return (
    <div className="flex w-max items-center gap-1 rounded-2xl border border-primary/8 bg-white/72 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/8 dark:bg-white/7">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="size-1.5 rounded-full bg-primary/70 dark:bg-white/60"
          animate={{
            y: ["0%", "-50%", "0%"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: dot * 0.15,
          }}
        />
      ))}
    </div>
  );
}
