"use client"

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  return (
    <AnimatedThemeToggler
      aria-label="Alternar tema"
      duration={520}
      variant="circle"
      className={cn(
        "grid size-12 place-items-center rounded-full border border-foreground/10 bg-background/70 text-foreground shadow-[0_1rem_3rem_rgb(0_0_0/12%)] backdrop-blur-2xl backdrop-saturate-150 transition-colors hover:bg-background/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-white/10 dark:bg-white/8 dark:text-white dark:hover:bg-white/12",
        className
      )}
    />
  )
}
