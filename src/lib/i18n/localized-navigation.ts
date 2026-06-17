import {
  deLocalizeHref,
  localizeHref,
  setLocale,
  type Locale,
} from "@/paraglide/runtime"

export function createLocalizedHref(
  currentHref: string,
  locale: Locale
): string {
  return localizeHref(deLocalizeHref(currentHref), { locale })
}

export async function persistLocale(locale: Locale): Promise<void> {
  await setLocale(locale, { reload: false })
}
