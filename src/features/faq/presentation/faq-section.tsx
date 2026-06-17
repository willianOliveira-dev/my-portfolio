"use client";

import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const { locale } = useCurrentLocale();

  const faqs = [
    {
      question: m.faq_q1({}, { locale }),
      answer: m.faq_a1({}, { locale }),
    },
    {
      question: m.faq_q2({}, { locale }),
      answer: m.faq_a2({}, { locale }),
    },
    {
      question: m.faq_q3({}, { locale }),
      answer: m.faq_a3({}, { locale }),
    },
    {
      question: m.faq_q4({}, { locale }),
      answer: m.faq_a4({}, { locale }),
    },
    {
      question: m.faq_q5({}, { locale }),
      answer: m.faq_a5({}, { locale }),
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full scroll-mt-24 bg-background px-4 py-24 sm:px-8 md:py-32 lg:px-16 xl:px-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {m.faq_title({}, { locale })}
          </h2>
        </div>

        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-foreground/10 bg-background/50 px-6 py-2 shadow-sm backdrop-blur-md dark:border-white/10"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline data-[state=open]:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
