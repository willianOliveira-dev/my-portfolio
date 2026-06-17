"use client";

import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const { locale } = useCurrentLocale();

  return (
    <section
      id="contact"
      className="relative w-full scroll-mt-24 bg-background px-4 py-20 sm:px-8 md:py-24 lg:px-16 xl:px-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(36rem,1.2fr)] lg:gap-14">
        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {m.contact_section_title_1({}, { locale })}
            <span className="text-red-600 dark:text-red-500">
              {m.contact_section_title_2({}, { locale })}
            </span>
            .
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {m.contact_section_description({}, { locale })}
          </p>
        </div>

        <div className="flex w-full items-start justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
