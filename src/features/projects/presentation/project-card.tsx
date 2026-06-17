import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { Locale } from '@/paraglide/runtime';

import { ProjectActions } from './project-actions';
import { ProjectMedia } from './project-media';
import { ProjectTechMarquee } from './project-tech-marquee';
import type { Project } from '../project-types';

type ProjectCardProps = {
    project: Project;
    locale: Locale;
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
    return (
        <Card className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-background/50 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-primary/20 hover:shadow-primary/5 dark:border-white/10 dark:hover:border-primary/30">
            <div className="relative">
                <ProjectMedia project={project} />
                <div className="absolute left-4 top-4">
                    <Badge variant="inverse" className="backdrop-blur-xl">
                        {project.statusLabel}
                    </Badge>
                </div>
            </div>

            <CardHeader className="min-w-0 flex-none pt-6">
                <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </CardTitle>
                <ProjectTechMarquee technologies={project.technologies} />
            </CardHeader>

            <CardContent className="flex grow flex-col gap-3">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {project.description}
                </CardDescription>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.status}
                </p>
            </CardContent>

            <CardFooter className="flex-none flex items-center gap-4 pb-6">
                <ProjectActions project={project} locale={locale} />
            </CardFooter>
        </Card>
    );
}
