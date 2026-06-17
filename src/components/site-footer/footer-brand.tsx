import { SiteLogo } from "@/components/site-header/site-logo";

export type FooterBrandProps = {
  copyrightText: string;
};

export function FooterBrand({ copyrightText }: FooterBrandProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <SiteLogo compact />
        <span className="font-heading text-xl font-bold tracking-tight text-foreground">
          Willian Oliveira
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        {copyrightText}
      </p>
    </div>
  );
}
