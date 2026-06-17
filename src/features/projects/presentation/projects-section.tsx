"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import { useEffect, useState } from "react";
import * as m from "@/paraglide/messages";
import { useCurrentLocale } from "@/hooks/use-current-locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import githubIcon from "@public/images/github.png";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export function ProjectsSection() {
  const [isDark, setIsDark] = useState(true);
  const { locale } = useCurrentLocale();

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const particleColor = isDark ? "#FFFFFF" : "#000000";

  const projects = [
    {
      title: m.project_1_title({}, { locale }),
      description: m.project_1_description({}, { locale }),
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: m.project_2_title({}, { locale }),
      description: m.project_2_description({}, { locale }),
      tags: ["Node.js", "PostgreSQL", "Prisma", "Express"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: m.project_3_title({}, { locale }),
      description: m.project_3_description({}, { locale }),
      tags: ["Vue.js", "Nuxt", "Pinia", "Framer Motion"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: m.project_4_title({}, { locale }),
      description: m.project_4_description({}, { locale }),
      tags: ["Python", "FastAPI", "Docker", "AWS"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

  return (
    <section id="projects" className="relative w-full bg-background flex flex-col items-center justify-start overflow-hidden pt-24 pb-32">
      <div className="flex flex-col items-center justify-center w-full relative z-20 mb-16">
        <h2 className="md:text-7xl text-5xl lg:text-8xl font-bold text-center text-foreground relative z-20 mb-4">
          {m.navigation_projects({}, { locale })}
        </h2>
        <div className="w-[300px] sm:w-[500px] h-10 relative">
          <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-primary to-transparent h-[2px] w-full blur-sm" />
          <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-primary to-transparent h-px w-full" />
          <div className="absolute inset-x-1/4 top-0 bg-linear-to-r from-transparent via-primary/50 to-transparent h-[5px] w-1/2 blur-sm" />
          <div className="absolute inset-x-1/4 top-0 bg-linear-to-r from-transparent via-primary/50 to-transparent h-px w-1/2" />

          <SparklesCore
            id="tsparticlesprojects"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor={particleColor}
          />
          <div className="absolute inset-0 w-full h-full bg-background mask-[radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-8 relative z-30">
        {projects.map((project, idx) => (
          <Card key={idx} className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/50 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-primary/5 hover:border-primary/20 dark:border-white/10 dark:hover:border-primary/30 flex flex-col">
            <div className="relative w-full aspect-video bg-muted/30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                <span className="text-sm tracking-widest uppercase font-semibold">Image Placeholder</span>
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <CardHeader className="flex-none pt-6">
              <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                {project.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-secondary/50 font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="grow">
              <CardDescription className="text-base text-muted-foreground leading-relaxed">
                {project.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="flex-none flex items-center gap-4 pb-6">
              <Button variant="default" size="sm" className="gap-2 rounded-full" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" />
                  Live Preview
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2 rounded-full border-foreground/20 hover:bg-foreground/5" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Image src={githubIcon} alt="GitHub" width={20} height={20} />
                  Source Code
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
