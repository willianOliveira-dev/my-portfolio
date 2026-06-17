import ColourfulText from "@/components/ui/colourful-text"
import {
  hero_greeting,
  hero_name,
  hero_role,
  hero_testimonial,
  hero_title_intro,
} from "@/paraglide/messages"
import type { Locale } from "@/paraglide/runtime"

type HeroHeadingProps = {
  locale: Locale
}

export function HeroHeading({ locale }: HeroHeadingProps) {
  return (
    <div className="relative z-20 flex flex-col items-start gap-6 text-left motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700">
      <div>
        <span className="inline-flex rounded-full border border-foreground/10 bg-background/70 px-5 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-2xl backdrop-saturate-150 sm:text-base">
          {hero_greeting({}, { locale })}
        </span>
      </div>

      <h1
        id="hero-title"
        className="max-w-4xl font-heading text-5xl font-semibold leading-none tracking-tighter text-foreground sm:text-7xl lg:text-8xl"
      >
        {hero_title_intro({}, { locale })}{" "}
        <ColourfulText text={hero_name({}, { locale })} />,
        <span className="block" />
        {hero_role({}, { locale })}
      </h1>

      <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {hero_testimonial({}, { locale })}
      </p>
    </div>
  )
}
