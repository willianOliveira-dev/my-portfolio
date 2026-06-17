import { Marquee } from '@/components/ui/marquee';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';

import type { ProjectTechnology } from '../project-types';

type ProjectTechMarqueeProps = {
    technologies: ProjectTechnology[];
};

export function ProjectTechMarquee({ technologies }: ProjectTechMarqueeProps) {
    return (
        <TooltipProvider delayDuration={120}>
            <Marquee
                gap={12}
                speed={48}
                speedOnHover={18}
                fadeEdges
                fadeWidth={32}
                draggable={false}
                pauseOnTap={false}
                className="mt-4 w-full min-w-0"
            >
                {technologies.map((technology) => (
                    <Tooltip key={technology.name}>
                        <TooltipTrigger asChild>
                            <span
                                aria-label={technology.name}
                                className="inline-flex size-11 items-center justify-center transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <Image
                                    src={technology.iconSrc}
                                    alt=""
                                    width={28}
                                    height={28}
                                    className="size-7 object-contain"
                                    aria-hidden="true"
                                    unoptimized
                                />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={8}>
                            {technology.name}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </Marquee>
        </TooltipProvider>
    );
}
