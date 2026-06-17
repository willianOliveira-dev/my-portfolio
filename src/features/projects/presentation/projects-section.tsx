'use client';

import { SparklesCore } from '@/components/ui/sparkles';
import { Button } from '@/components/ui/button';
import { useCurrentLocale } from '@/hooks/use-current-locale';
import * as m from '@/paraglide/messages';
import githubIcon from '@public/images/github.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getProjects } from '../project-data';
import { ProjectCard } from './project-card';

export function ProjectsSection() {
    const [isDark, setIsDark] = useState(true);
    const { locale } = useCurrentLocale();
    const projects = getProjects(locale);

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    const particleColor = isDark ? '#FFFFFF' : '#000000';

    return (
        <section
            id="projects"
            className="relative flex w-full flex-col items-center justify-start overflow-hidden bg-background pb-20 pt-16"
        >
            <div className="flex flex-col items-center justify-center w-full relative z-20 mb-10">
                <h2 className="md:text-7xl text-5xl lg:text-8xl font-bold text-center text-foreground relative z-20 mb-4">
                    {m.navigation_projects({}, { locale })}
                </h2>
                <div className="w-75 sm:w-125 h-10 relative">
                    <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-primary to-transparent h-0.5 w-full blur-sm" />
                    <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-primary to-transparent h-px w-full" />
                    <div className="absolute inset-x-1/4 top-0 bg-linear-to-r from-transparent via-primary/50 to-transparent h-1.25 w-1/2 blur-sm" />
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

            <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-8 relative z-30">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        locale={locale}
                    />
                ))}
            </div>

            <div className="relative z-30 mt-8 flex flex-col items-center gap-3 px-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                    {m.project_more_question({}, { locale })}
                </p>
                <Button
                    variant="outline"
                    className="gap-2 rounded-full"
                    asChild
                >
                    <a
                        href="https://github.com/willianOliveira-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src={githubIcon}
                            alt="GitHub"
                            width={20}
                            height={20}
                        />
                        {m.project_more_github({}, { locale })}
                    </a>
                </Button>
            </div>
        </section>
    );
}
