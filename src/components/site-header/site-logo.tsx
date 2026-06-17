import Image from "next/image"
import Link from "next/link"

import { useCurrentLocale } from "@/hooks/use-current-locale"
import { cn } from "@/lib/utils"
import { home_link } from "@/paraglide/messages"
import logo from "@public/images/logo.svg"
import logoRed from "@public/images/logo-red.svg"

type SiteLogoProps = {
  compact?: boolean
}

export function SiteLogo({ compact = false }: SiteLogoProps) {
  const { locale } = useCurrentLocale()

  return (
    <Link
      href="#home"
      aria-label={home_link({}, { locale })}
      className={cn(
        "group flex items-center justify-center rounded-full outline-none transition-[background-color,filter] duration-300 hover:bg-foreground/5 hover:brightness-110 focus-visible:ring-3 focus-visible:ring-ring/50 dark:hover:bg-white/10 dark:hover:brightness-125",
        compact ? "h-10 px-3" : "h-16 w-52 px-6"
      )}
    >
      <span className="relative grid place-items-center">
        <Image
          src={logoRed}
          alt=""
          aria-hidden="true"
          priority
          className={cn(
            "h-auto transition-[filter,opacity] duration-300 group-hover:brightness-110 dark:opacity-0",
            compact ? "w-8" : "w-10"
          )}
        />
        <Image
          src={logo}
          alt=""
          aria-hidden="true"
          priority
          className={cn(
            "absolute h-auto opacity-0 transition-[filter,opacity] duration-300 dark:opacity-100 dark:group-hover:brightness-125",
            compact ? "w-8" : "w-10"
          )}
        />
      </span>
    </Link>
  )
}
