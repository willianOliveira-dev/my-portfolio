import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AnimatedCodeBlock } from '@/components/ui/animated-code-block';
import { Button } from '@/components/ui/button';
import notebookImage from '@public/images/notebook-image-transparent.png';
import {
    hero_contact,
    hero_notebook_alt,
    hero_projects,
} from '@/paraglide/messages';
import type { Locale } from '@/paraglide/runtime';

const notebookCode = `using System;
public class Program
{
  public static void Main(string[] args)
  {
    Console.WriteLine("Hello, World!");
  }
}`;

type HeroVisualProps = {
    locale: Locale;
};

export function HeroVisual({ locale }: HeroVisualProps) {
    return (
        <div className="relative isolate mx-auto flex min-h-0 w-full min-w-0 max-w-3xl flex-col items-center justify-center overflow-visible sm:min-h-96 lg:min-h-144 lg:max-w-none">
            <div className="relative left-[calc(50%-53vw)] w-[106vw] max-w-116 sm:left-auto sm:w-full sm:max-w-none">
                <Image
                    src={notebookImage}
                    alt={hero_notebook_alt({}, { locale })}
                    priority
                    sizes="(min-width: 1024px) 48vw, 92vw"
                    className="h-auto w-full"
                />

                <div className="notebook-screen-overlay absolute overflow-hidden bg-code-nightowl">
                    <AnimatedCodeBlock
                        code={notebookCode}
                        language="csharp"
                        theme="dark"
                        title="Program.cs"
                        className="hero-notebook-code"
                        typingSpeed={90}
                        showLineNumbers={true}
                        showControls={false}
                        autoPlay
                        loop
                    />
                </div>
            </div>

            <div className="mt-0 flex rounded-full border border-foreground/10 bg-background/70 p-2 shadow-xl shadow-black/10 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/8 sm:mt-2">
                <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full px-5 text-base sm:px-7"
                >
                    <Link href="#projects">
                        {hero_projects({}, { locale })}
                        <ArrowUpRightIcon
                            data-icon="inline-end"
                            aria-hidden="true"
                        />
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="h-12 rounded-full px-5 text-base text-foreground hover:bg-foreground/6 hover:text-foreground sm:px-7 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
                >
                    <Link href="#contact">{hero_contact({}, { locale })}</Link>
                </Button>
            </div>
        </div>
    );
}
