import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/paraglide/runtime';
import githubIcon from '@public/images/github.png';
import { Download, ExternalLink, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import * as m from '@/paraglide/messages';

import type { Project } from '../project-types';

type ProjectActionsProps = {
    project: Project;
    locale: Locale;
};

export function ProjectActions({ project, locale }: ProjectActionsProps) {
    return (
        <>
            {project.downloadUrl ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="default"
                            size="sm"
                            className="gap-2 rounded-full"
                        >
                            <Download className="size-4" aria-hidden="true" />
                            {m.project_download_apk({}, { locale })}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogMedia>
                                <ShieldCheck aria-hidden="true" />
                            </AlertDialogMedia>
                            <AlertDialogTitle>
                                {m.project_download_dialog_title(
                                    {},
                                    { locale },
                                )}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {m.project_download_dialog_description(
                                    {},
                                    { locale },
                                )}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                {m.project_download_cancel({}, { locale })}
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <a href={project.downloadUrl} download>
                                    {m.project_download_confirm({}, { locale })}
                                </a>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : null}

            {project.liveUrl ? (
                <Button
                    variant="default"
                    size="sm"
                    className="gap-2 rounded-full"
                    asChild
                >
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink className="size-4" />
                        {m.project_live_preview({}, { locale })}
                    </a>
                </Button>
            ) : null}

            {project.sourceUrl ? (
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full border-foreground/20 hover:bg-foreground/5"
                    asChild
                >
                    <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src={githubIcon}
                            alt="GitHub"
                            width={20}
                            height={20}
                        />
                        {m.project_source_code({}, { locale })}
                    </a>
                </Button>
            ) : null}
        </>
    );
}
