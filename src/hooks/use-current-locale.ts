"use client"

import { useContext } from "react"

import { LocaleContext } from "@/lib/i18n/locale-context"

export function useCurrentLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error("useCurrentLocale must be used within LocaleProvider")
  }

  return context
}
