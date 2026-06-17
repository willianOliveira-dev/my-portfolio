"use client"

import { CheckIcon, ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentLocale } from "@/hooks/use-current-locale"
import {
  createLocalizedHref,
  persistLocale,
} from "@/lib/i18n/localized-navigation"
import {
  language_english,
  language_portuguese,
  language_spanish,
  language_switcher_label,
} from "@/paraglide/messages"
import type { Locale } from "@/paraglide/runtime"

import { languageOptions } from "./language-switcher.constants"

type LanguageSwitcherProps = {
  triggerClassName?: string
  contentAlign?: "start" | "center" | "end"
  contentSide?: "top" | "right" | "bottom" | "left"
}

function getLanguageLabel(locale: Locale, currentLocale: Locale): string {
  switch (locale) {
    case "pt-br":
      return language_portuguese({}, { locale: currentLocale })
    case "en":
      return language_english({}, { locale: currentLocale })
    case "es":
      return language_spanish({}, { locale: currentLocale })
  }
}

export function LanguageSwitcher({
  triggerClassName,
  contentAlign = "start",
  contentSide = "top",
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { locale: currentLocale, setLocale: setCurrentLocale } =
    useCurrentLocale()
  const currentLanguage = languageOptions.find(
    (language) => language.locale === currentLocale
  )

  async function changeLanguage(locale: Locale) {
    const currentHref = `${pathname}${window.location.search}${window.location.hash}`
    const localizedHref = createLocalizedHref(currentHref, locale)

    await persistLocale(locale)
    setCurrentLocale(locale)
    router.replace(localizedHref)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          aria-label={language_switcher_label(
            {},
            { locale: currentLocale }
          )}
          className={triggerClassName ?? "h-12 rounded-full bg-foreground/6 px-3 text-foreground hover:bg-foreground/10 hover:text-foreground dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:hover:text-white"}
        >
          <Image
            src={currentLanguage?.flag ?? languageOptions[0].flag}
            alt=""
            aria-hidden="true"
            className="h-4 w-6 rounded-xs object-cover"
          />
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={contentAlign}
        side={contentSide}
        className="min-w-52"
      >
        <DropdownMenuGroup>
          {languageOptions.map((language) => (
            <DropdownMenuItem
              key={language.locale}
              onSelect={() => changeLanguage(language.locale)}
              className="h-10 gap-3 px-3"
            >
              <Image
                src={language.flag}
                alt=""
                aria-hidden="true"
                className="h-4 w-6 rounded-xs object-cover"
              />
              <span className="flex-1">
                {getLanguageLabel(language.locale, currentLocale)}
              </span>
              {language.locale === currentLocale ? <CheckIcon /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
