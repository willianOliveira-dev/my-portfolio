"use client"

import { createContext } from "react"

import type { Locale } from "@/paraglide/runtime"

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
