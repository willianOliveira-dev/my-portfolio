import { TerminalSquare } from 'lucide-react';
import Image from 'next/image';

import type { Project } from '../project-types';

type ProjectMediaProps = {
    project: Project;
};

type ProjectFrameProps = ProjectMediaProps & {
    imageSrc: string;
};

export function ProjectMedia({ project }: ProjectMediaProps) {
    return (
        <div className="relative w-full aspect-video bg-muted/30 overflow-hidden">
            {project.downloadUrl && project.imageSrc ? (
                <MobileProjectFrame
                    project={project}
                    imageSrc={project.imageSrc}
                />
            ) : project.imageSrc ? (
                <DesktopProjectFrame
                    project={project}
                    imageSrc={project.imageSrc}
                />
            ) : (
                <LocalProjectFallback project={project} />
            )}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
}

function MobileProjectFrame({ project, imageSrc }: ProjectFrameProps) {
    return (
        <div
            aria-label={project.imageAlt}
            className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.26),transparent_34%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--muted)))]"
            role="img"
        >
            <div className="relative aspect-9/16 h-[82%] overflow-hidden rounded-[2rem] border border-foreground/10 bg-background/80 p-1.5 shadow-2xl">
                <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-muted">
                    <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 24vw, 56vw"
                        className="object-cover object-top"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </div>
    );
}

function DesktopProjectFrame({ project, imageSrc }: ProjectFrameProps) {
    return (
        <div
            aria-label={project.imageAlt}
            className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.2),transparent_34%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--muted)))] px-5 py-6"
            role="img"
        >
            <div className="relative w-full max-w-[92%]">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-foreground/10 bg-background p-1.5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                    <div className="absolute left-0 right-0 top-0 flex h-7 items-center gap-1.5 border-b border-foreground/10 bg-muted/70 px-3">
                        <span className="size-2 rounded-full bg-foreground/20" />
                        <span className="size-2 rounded-full bg-foreground/20" />
                        <span className="size-2 rounded-full bg-foreground/20" />
                    </div>
                    <div className="relative mt-7 h-[calc(100%-1.75rem)] overflow-hidden rounded-b-lg bg-muted">
                        <Image
                            src={imageSrc}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 44vw, 88vw"
                            className="object-cover object-top"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div className="mx-auto h-3 w-1/3 rounded-b-xl bg-foreground/10 shadow-lg" />
                <div className="mx-auto h-2 w-2/3 rounded-full bg-foreground/10 blur-[1px]" />
            </div>
        </div>
    );
}

function LocalProjectFallback({ project }: ProjectMediaProps) {
    return (
        <div
            aria-label={project.imageAlt}
            className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.24),transparent_34%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--muted)))] px-6 py-7"
            role="img"
        >
            <div className="relative w-full max-w-[88%] overflow-hidden rounded-2xl border border-foreground/10 bg-background/85 shadow-2xl">
                <div className="flex h-8 items-center gap-1.5 border-b border-foreground/10 bg-muted/70 px-3">
                    <span className="size-2 rounded-full bg-foreground/20" />
                    <span className="size-2 rounded-full bg-foreground/20" />
                    <span className="size-2 rounded-full bg-foreground/20" />
                </div>
                <div className="flex min-h-40 flex-col justify-between gap-5 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                            <TerminalSquare
                                className="size-7 text-primary"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="grid gap-1">
                            <span className="h-2.5 w-32 rounded-full bg-foreground/20" />
                            <span className="h-2 w-20 rounded-full bg-foreground/10" />
                        </div>
                    </div>
                    <div className="rounded-xl border border-foreground/10 bg-muted/40 p-3 font-mono text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <TerminalSquare
                                className="size-4 text-primary"
                                aria-hidden="true"
                            />
                            <span>{project.title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
