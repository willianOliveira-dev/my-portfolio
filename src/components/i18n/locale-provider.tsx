"use client"

import { useMemo, useState, type ReactNode } from "react"

import { LocaleContext } from "@/lib/i18n/locale-context"
import type { Locale } from "@/paraglide/runtime"

type LocaleProviderProps = {
  children: ReactNode
  initialLocale: Locale
}

export function LocaleProvider({
  children,
  initialLocale,
}: LocaleProviderProps) {
  const [locale, setLocale] = useState(initialLocale)
  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}
