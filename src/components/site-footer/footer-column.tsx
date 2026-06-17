import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  preview?: boolean;
  isStatic?: boolean;
  imageSrc?: string;
  icon?: React.ReactNode;
};

export type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            {link.preview ? (
              link.isStatic && link.imageSrc ? (
                <LinkPreview url={link.href} isStatic={true} imageSrc={link.imageSrc} className="transition-colors hover:text-foreground flex items-center gap-2">
                  {link.icon}
                  <span>{link.label}</span>
                </LinkPreview>
              ) : (
                <LinkPreview url={link.href} className="transition-colors hover:text-foreground flex items-center gap-2">
                  {link.icon}
                  <span>{link.label}</span>
                </LinkPreview>
              )
            ) : link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground flex items-center gap-2"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ) : (
              <Link
                href={link.href}
                className="transition-colors hover:text-foreground flex items-center gap-2"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
