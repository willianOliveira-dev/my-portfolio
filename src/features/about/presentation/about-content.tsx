import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  about_download_resume,
  about_paragraph_one,
  about_paragraph_three,
  about_paragraph_two,
} from "@/paraglide/messages"
import type { Locale } from "@/paraglide/runtime"

import { RESUME_FILE_NAME, RESUME_PUBLIC_PATH } from "../about.constants"

type AboutContentProps = {
  locale: Locale
}

export function AboutContent({ locale }: AboutContentProps) {
  return (
    <div className="pointer-events-auto flex flex-col items-start gap-5 rounded-3xl border border-foreground/10 bg-white/55 p-5 shadow-[0_2rem_5rem_rgb(0_0_0/10%),inset_0_1px_0_rgb(255_255_255/70%)] backdrop-blur-2xl backdrop-saturate-150 sm:gap-6 sm:p-7 lg:rounded-[2rem] dark:border-white/10 dark:bg-white/7 dark:shadow-[0_2rem_5rem_rgb(0_0_0/35%),inset_0_1px_0_rgb(255_255_255/8%)]">
      <div className="grid max-w-184 gap-3 text-sm leading-relaxed text-muted-foreground sm:gap-4 sm:text-base [&>p:nth-child(2)]:text-foreground">
        <p>{about_paragraph_one({}, { locale })}</p>
        <p>{about_paragraph_two({}, { locale })}</p>
        <p>{about_paragraph_three({}, { locale })}</p>
      </div>

      <Button
        asChild
        size="lg"
        className="h-12 w-full rounded-full border-white/20 px-6 text-sm shadow-[0_1rem_2.5rem_rgba(193,0,7,0.18)] sm:w-auto"
      >
        <a href={RESUME_PUBLIC_PATH} download={RESUME_FILE_NAME}>
          <DownloadIcon aria-hidden="true" />
          {about_download_resume({}, { locale })}
        </a>
      </Button>
    </div>
  )
}
