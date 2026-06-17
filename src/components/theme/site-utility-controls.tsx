"use client"

import { LanguageSwitcher } from "@/components/site-header/language-switcher"

import { ThemeToggle } from "./theme-toggle"

export function SiteUtilityControls() {
  return (
    <div className="fixed right-4 top-4 z-60 hidden items-center gap-2 sm:right-6 sm:top-6 navigation:flex">
      <LanguageSwitcher
        contentAlign="end"
        contentSide="bottom"
        triggerClassName="h-12 rounded-full border border-foreground/10 bg-background/70 px-3 text-foreground shadow-[0_1rem_3rem_rgb(0_0_0/12%)] backdrop-blur-2xl backdrop-saturate-150 hover:bg-background/85 hover:text-foreground dark:border-white/10 dark:bg-white/8 dark:text-white dark:hover:bg-white/12 dark:hover:text-white"
      />
      <ThemeToggle />
    </div>
  )
}
