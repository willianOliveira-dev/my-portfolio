import Link from "next/link"

import { cn } from "@/lib/utils"

type DesktopNavigationLinkProps = {
  href: string
  label: string
  active?: boolean
  className?: string
}

export function DesktopNavigationLink({
  href,
  label,
  active = false,
  className,
}: DesktopNavigationLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-6 text-base tracking-tight text-foreground outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 dark:text-white",
        active
          ? "bg-primary font-bold text-primary-foreground"
          : "font-normal hover:bg-foreground/6 hover:text-foreground dark:hover:bg-white/10 dark:hover:text-white",
        className
      )}
    >
      {label}
    </Link>
  )
}
