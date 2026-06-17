import type { StaticImageData } from "next/image"

import type { Locale } from "@/paraglide/runtime"
import brazilFlag from "@public/images/brazil.png"
import unitedStatesFlag from "@public/images/eua.png"
import spainFlag from "@public/images/span.png"

export type LanguageOption = {
  locale: Locale
  flag: StaticImageData
}

export const languageOptions = [
  {
    locale: "pt-br",
    flag: brazilFlag,
  },
  {
    locale: "en",
    flag: unitedStatesFlag,
  },
  {
    locale: "es",
    flag: spainFlag,
  },
] as const satisfies readonly LanguageOption[]
