"use client";

import { useCurrentLocale } from "@/hooks/use-current-locale";
import * as m from "@/paraglide/messages";

import Image from "next/image";
import { Mail } from "lucide-react";

import githubIcon from "@public/images/github.png";
import linkedinIcon from "@public/images/linkedin.png";
import instagramIcon from "@public/images/instagram.png";

import { FooterBrand } from "@/components/site-footer/footer-brand";
import { FooterColumn, type FooterLink } from "./footer-column";
import { FooterWatermark } from "./footer-watermark";

export function SiteFooter() {
  const { locale } = useCurrentLocale();
  const currentYear = new Date().getFullYear().toString();

  const pagesLinks: FooterLink[] = [
    { label: m.footer_link_home({}, { locale }), href: "#home" },
    { label: m.footer_link_about({}, { locale }), href: "#about" },
    { label: m.footer_link_journey({}, { locale }), href: "#journey" },
    { label: m.footer_link_contact({}, { locale }), href: "#contact" },
  ];

  const socialsLinks: FooterLink[] = [
    { 
      label: "GitHub", 
      href: "https://github.com/willianOliveira-dev", 
      external: true, 
      preview: true, 
      icon: <Image src={githubIcon} alt="GitHub" className="h-4 w-4" /> 
    },
    { 
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/willian-oliveira-66a230353/", 
      external: true, 
      preview: true,
      isStatic: true,
      imageSrc: "/images/linkedin-preview.png",
      icon: <Image src={linkedinIcon} alt="LinkedIn" className="h-4 w-4" />
    },
    { 
      label: "Instagram", 
      href: "https://www.instagram.com/willianolive_r/", 
      external: true, 
      preview: true,
      isStatic: true,
      imageSrc: "/images/instagram-preview.png",
      icon: <Image src={instagramIcon} alt="Instagram" className="h-4 w-4" />
    },
    { label: "Contato", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ];

  const legalLinks: FooterLink[] = [
    { label: m.footer_link_privacy({}, { locale }), href: "#" },
    { label: m.footer_link_terms({}, { locale }), href: "#" },
  ];

  return (
    <footer className="relative mt-24 border-t border-foreground/10 bg-background pt-16 pb-8 dark:border-white/10">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <FooterBrand
            copyrightText={m.footer_copyright({ year: currentYear }, { locale })}
          />

          <div className="lg:justify-self-center">
            <FooterColumn
              title={m.footer_pages_title({}, { locale })}
              links={pagesLinks}
            />
          </div>

          <div className="lg:justify-self-center">
            <FooterColumn
              title={m.footer_socials_title({}, { locale })}
              links={socialsLinks}
            />
          </div>

          <div className="lg:justify-self-end">
            <FooterColumn
              title={m.footer_legal_title({}, { locale })}
              links={legalLinks}
            />
          </div>
        </div>

        <FooterWatermark />
      </div>
    </footer>
  );
}
