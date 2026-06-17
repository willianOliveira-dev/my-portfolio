import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { baseLocale, isLocale } from "@/paraglide/runtime";

import "streamdown/styles.css";
import "./globals.css";

const lufga = localFont({
  src: [
    {
      path: "../../public/fonts/Lufga-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lufga-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Lufga-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lufga-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lufga-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lufga",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Willian Oliveira | Desenvolvedor Full Stack com foco em Backend",
  description: "Portfólio de Willian Oliveira, desenvolvedor Full Stack com foco em Backend. Projetos, experiências e tecnologias voltadas para desenvolvimento web e APIs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestLocale = requestHeaders.get("x-paraglide-locale");
  const locale = isLocale(requestLocale) ? requestLocale : baseLocale;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${lufga.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={locale}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </LocaleProvider>
      </body>
    </html>
  );
}
