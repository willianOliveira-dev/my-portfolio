import { m } from "@/paraglide/messages"
import type { Locale } from "@/paraglide/runtime"

type AboutHeadingProps = {
  locale: Locale
}

export function AboutHeading({ locale }: AboutHeadingProps) {
  return (
    <div className="self-start pt-0 lg:pt-4">
      <h2
        id="about-title"
        className="max-w-2xl font-heading text-[clamp(2.75rem,13vw,3.75rem)] font-bold leading-[0.92] tracking-[-0.055em] text-foreground sm:text-[clamp(3rem,8vw,4.75rem)] lg:max-w-140 lg:text-[clamp(3.5rem,5.5vw,5.75rem)]"
      >
        {m.about_title({}, { locale })}
      </h2>
      <span
        aria-hidden="true"
        className="mt-8 block h-1 w-20 rounded-full bg-primary"
      />
    </div>
  )
}
