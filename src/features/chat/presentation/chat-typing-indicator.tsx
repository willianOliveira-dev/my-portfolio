import { motion } from "motion/react";

export function ChatTypingIndicator() {
  return (
    <div className="flex w-max items-center gap-1 rounded-2xl bg-muted px-4 py-3">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-foreground/50"
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
