"use client"

import { useCurrentLocale } from "@/hooks/use-current-locale"

import { AboutContent } from "./about-content"
import { AboutHeading } from "./about-heading"
import { AboutKeyboardShowcase } from "./about-keyboard-showcase"

export function AboutSection() {
  const { locale } = useCurrentLocale()

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 isolate -mt-12 overflow-hidden scroll-mt-28 bg-(--about-section-bg) px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(135deg,var(--about-section-bg)_0%,var(--about-section-wash)_62%,var(--about-section-accent)_100%)]"
      />


      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:min-h-144 lg:grid-cols-[minmax(0,1.08fr)_minmax(28rem,0.92fr)] lg:gap-14">
        <AboutKeyboardShowcase />

        <div className="flex flex-col gap-7 lg:justify-self-end">
          <AboutHeading locale={locale} />
          <AboutContent locale={locale} />
        </div>
      </div>
    </section>
  )
}
