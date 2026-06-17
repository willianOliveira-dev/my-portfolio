"use client"

import { useCurrentLocale } from "@/hooks/use-current-locale"
import { BubbleBackground } from "@/components/ui/bubble-background"
import { HeroHeading } from "./hero-heading"
import { HeroVisual } from "./hero-visual"

export function HeroSection() {
  const { locale } = useCurrentLocale()

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate -mt-20 min-h-screen w-full overflow-hidden"
    >
      <BubbleBackground
        className="-z-10"
        bgColorA="var(--hero-bg-a)"
        bgColorB="var(--hero-bg-b)"
        bubbleColors={{
          colorA: "var(--hero-bubble-a)",
          colorB: "var(--hero-bubble-b)",
          colorC: "var(--hero-bubble-c)",
          colorD: "var(--hero-bubble-d)",
          colorE: "var(--hero-bubble-e)",
          interactive: "var(--hero-bubble-interactive)",
        }}
        blendMode="hard-light"
        bubbleSize="var(--hero-bubble-size)"
      />
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-screen-2xl items-center gap-6 px-4 pb-28 pt-32 sm:gap-12 sm:px-6 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="lg:col-span-7 lg:pb-24">
          <HeroHeading locale={locale} />
        </div>

        <div className="min-w-0 lg:col-span-5 lg:-ml-24 lg:pt-28">
          <HeroVisual locale={locale} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-linear-to-b from-transparent to-(--about-section-bg)"
      />
    </section>
  )
}
