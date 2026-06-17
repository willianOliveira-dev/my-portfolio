"use client"

import * as React from "react"
import { MenuIcon, XIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useActiveSection } from "@/hooks/use-active-section"
import { useCurrentLocale } from "@/hooks/use-current-locale"
import { useStickyHeader } from "@/hooks/use-sticky-header"
import { cn } from "@/lib/utils"
import {
  close_navigation,
  language_switcher_label,
  open_navigation,
  primary_navigation,
} from "@/paraglide/messages"

import { DesktopNavigationLink } from "./desktop-navigation-link"
import { LanguageSwitcher } from "./language-switcher"
import { navigationHrefs, navigationItems } from "./navigation.constants"
import { SiteLogo } from "./site-logo"

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const activeSection = useActiveSection(navigationHrefs)
  const isExpanded = useStickyHeader()
  const { locale } = useCurrentLocale()

  React.useEffect(() => {
    const closeMenu = () => setIsOpen(false)

    window.addEventListener("hashchange", closeMenu)
    return () => window.removeEventListener("hashchange", closeMenu)
  }, [])

  return (
    <header data-scrolled={isExpanded} className="site-header">
      <nav
        aria-label={primary_navigation({}, { locale })}
        className="site-header-navigation"
      >
        <div className="site-header-desktop hidden items-center justify-between navigation:flex">
            <DesktopNavigationLink
              href={navigationItems[0].href}
              label={navigationItems[0].message({}, { locale })}
              active={activeSection === navigationItems[0].href.slice(1)}
              className="w-28"
            />
            <DesktopNavigationLink
              href={navigationItems[1].href}
              label={navigationItems[1].message({}, { locale })}
              active={activeSection === navigationItems[1].href.slice(1)}
              className="w-28"
            />
            <DesktopNavigationLink
              href={navigationItems[2].href}
              label={navigationItems[2].message({}, { locale })}
              active={activeSection === navigationItems[2].href.slice(1)}
              className="w-40"
            />

            <SiteLogo />

            <DesktopNavigationLink
              href={navigationItems[3].href}
              label={navigationItems[3].message({}, { locale })}
              active={activeSection === navigationItems[3].href.slice(1)}
              className="w-31"
            />
            <DesktopNavigationLink
              href={navigationItems[4].href}
              label={navigationItems[4].message({}, { locale })}
              active={activeSection === navigationItems[4].href.slice(1)}
              className="w-30"
            />
            <DesktopNavigationLink
              href={navigationItems[5].href}
              label={navigationItems[5].message({}, { locale })}
              active={activeSection === navigationItems[5].href.slice(1)}
              className="w-31"
            />
        </div>

        <div className="site-header-mobile relative z-50 navigation:hidden">
            <div className="site-header-mobile-bar relative z-50 flex items-center justify-between px-2">
              <SiteLogo compact />
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-label={
                  isOpen
                    ? close_navigation({}, { locale })
                    : open_navigation({}, { locale })
                }
                className="rounded-full text-foreground hover:bg-foreground/6 hover:text-foreground dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
                onClick={() => setIsOpen((current) => !current)}
              >
                {isOpen ? <XIcon /> : <MenuIcon />}
              </Button>
            </div>

            <div
              id="mobile-navigation"
              className={cn(
                "top-navigation-menu absolute inset-x-0 z-50 origin-top rounded-4xl border border-foreground/10 bg-background/75 p-2 shadow-2xl shadow-black/10 backdrop-blur-2xl backdrop-saturate-150 transition duration-200 dark:border-white/15 dark:bg-black/85 dark:shadow-black/30",
                isOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-2 scale-95 opacity-0"
              )}
            >
              <div className="grid gap-1 sm:grid-cols-2">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex h-11 items-center whitespace-nowrap rounded-full px-4 text-sm text-foreground outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 dark:text-white",
                        isActive
                          ? "bg-primary font-bold text-primary-foreground"
                          : "hover:bg-foreground/6 hover:text-foreground dark:hover:bg-white/10 dark:hover:text-white"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.message({}, { locale })}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-2 border-t border-foreground/10 pt-2 dark:border-white/10">
                <p className="px-4 pb-2 text-xs font-medium text-muted-foreground">
                  {language_switcher_label({}, { locale })}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <LanguageSwitcher
                    contentAlign="start"
                    contentSide="bottom"
                    triggerClassName="h-11 w-full justify-center rounded-2xl bg-foreground/6 px-4 text-foreground hover:bg-foreground/10 hover:text-foreground dark:bg-white/8 dark:text-white dark:hover:bg-white/12 dark:hover:text-white"
                  />
                  <ThemeToggle className="h-11 w-full rounded-2xl bg-foreground/6 shadow-none dark:bg-white/8" />
                </div>
              </div>
            </div>
          </div>
      </nav>
    </header>
  )
}
