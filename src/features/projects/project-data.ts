import * as m from '@/paraglide/messages';
import type { Locale } from '@/paraglide/runtime';

import type { Project } from './project-types';

export function getProjects(locale: Locale): Project[] {
    return [
        {
            title: m.project_1_title({}, { locale }),
            description: m.project_1_description({}, { locale }),
            status: m.project_1_status({}, { locale }),
            statusLabel: m.project_status_hosted({}, { locale }),
            technologies: [
                { name: 'Next.js', iconSrc: '/images/tech/Next.js.svg' },
                { name: 'React', iconSrc: '/images/tech/React.svg' },
                { name: 'TypeScript', iconSrc: '/images/tech/TypeScript.svg' },
                {
                    name: 'Tailwind CSS',
                    iconSrc: '/images/tech/Tailwind%20CSS.svg',
                },
                {
                    name: 'TanStack Query',
                    iconSrc: '/images/tech/Tanstack.svg',
                },
                { name: 'Better Auth', iconSrc: '/images/tech/BetterAuth.svg' },
                { name: 'Orval', iconSrc: '/images/tech/Orval.svg' },
                { name: 'Hono', iconSrc: '/images/tech/Hono.svg' },
                { name: 'Node.js', iconSrc: '/images/tech/Node.js.svg' },
                { name: 'PostgreSQL', iconSrc: '/images/tech/PostgresSQL.svg' },
                { name: 'Prisma', iconSrc: '/images/tech/Prisma.svg' },
                { name: 'Cloudinary', iconSrc: '/images/tech/Cloudinary.svg' },
                { name: 'Vercel', iconSrc: '/images/tech/Vercel.svg' },
                { name: 'Render', iconSrc: '/images/tech/Render.svg' },
            ],
            imageSrc: '/images/projects/cheffy-web.png',
            imageAlt: 'Interface web da plataforma Cheffy',
            sourceUrl: 'https://github.com/willianOliveira-dev/cheffy-web',
            liveUrl: 'https://cheffy-web.vercel.app/',
        },
        {
            title: m.project_2_title({}, { locale }),
            description: m.project_2_description({}, { locale }),
            status: m.project_2_status({}, { locale }),
            statusLabel: m.project_status_android({}, { locale }),
            technologies: [
                { name: 'React Native', iconSrc: '/images/tech/React.svg' },
                { name: 'TypeScript', iconSrc: '/images/tech/TypeScript.svg' },
                {
                    name: 'NativeWind',
                    iconSrc: '/images/tech/Tailwind%20CSS.svg',
                },
                {
                    name: 'TanStack Query',
                    iconSrc: '/images/tech/Tanstack.svg',
                },
                { name: 'Stripe', iconSrc: '/images/tech/Stripe.svg' },
                { name: 'Better Auth', iconSrc: '/images/tech/BetterAuth.svg' },
                { name: 'Orval', iconSrc: '/images/tech/Orval.svg' },
                { name: 'Fastify', iconSrc: '/images/tech/Fastify.svg' },
                { name: 'Node.js', iconSrc: '/images/tech/Node.js.svg' },
                { name: 'PostgreSQL', iconSrc: '/images/tech/PostgresSQL.svg' },
                { name: 'Cloudinary', iconSrc: '/images/tech/Cloudinary.svg' },
                { name: 'Docker', iconSrc: '/images/tech/Docker.svg' },
            ],
            imageSrc: '/images/projects/nero.jpeg',
            imageAlt: 'Aplicativo Android Nero para e-commerce de moda',
            sourceUrl: 'https://github.com/willianOliveira-dev/nero-mobile',
            downloadUrl: '/download/nero-mobile-v1.apk',
        },
        {
            title: m.project_3_title({}, { locale }),
            description: m.project_3_description({}, { locale }),
            status: m.project_3_status({}, { locale }),
            statusLabel: m.project_status_local({}, { locale }),
            technologies: [
                { name: 'React', iconSrc: '/images/tech/React.svg' },
                { name: 'TypeScript', iconSrc: '/images/tech/TypeScript.svg' },
                {
                    name: 'TanStack Query',
                    iconSrc: '/images/tech/Tanstack.svg',
                },
                { name: 'NestJS', iconSrc: '/images/tech/Nest.js.svg' },
                { name: 'Node.js', iconSrc: '/images/tech/Node.js.svg' },
                { name: 'Python', iconSrc: '/images/tech/Python.svg' },
                { name: 'Go', iconSrc: '/images/tech/Go.svg' },
                { name: 'RabbitMQ', iconSrc: '/images/tech/RabbitMQ.svg' },
                { name: 'Docker', iconSrc: '/images/tech/Docker.svg' },
            ],
            imageSrc: '/images/projects/gdash.png',
            imageAlt:
                'Dashboard local GDASH Climate Insights rodando via Docker Compose',
            sourceUrl:
                'https://github.com/willianOliveira-dev/desafio-gdash-2025-2',
        },
        {
            title: m.project_4_title({}, { locale }),
            description: m.project_4_description({}, { locale }),
            status: m.project_4_status({}, { locale }),
            statusLabel: m.project_status_hosted({}, { locale }),
            technologies: [
                { name: 'Python', iconSrc: '/images/tech/Python.svg' },
                { name: 'FastAPI', iconSrc: '/images/tech/FastAPI.svg' },
                { name: 'React', iconSrc: '/images/tech/React.svg' },
                { name: 'TypeScript', iconSrc: '/images/tech/TypeScript.svg' },
                {
                    name: 'TanStack Query',
                    iconSrc: '/images/tech/Tanstack.svg',
                },
                { name: 'Orval', iconSrc: '/images/tech/Orval.svg' },
                { name: 'PostgreSQL', iconSrc: '/images/tech/PostgresSQL.svg' },
                { name: 'Supabase', iconSrc: '/images/tech/Supabase.svg' },
                { name: 'Docker', iconSrc: '/images/tech/Docker.svg' },
                { name: 'Render', iconSrc: '/images/tech/Render.svg' },
            ],
            imageSrc: '/images/projects/nology.png',
            imageAlt: 'Interface web do sistema Nology Cashback',
            sourceUrl:
                'https://github.com/willianOliveira-dev/desafio-nology-2026-04',
            liveUrl: 'https://desafio-nology-2026-04.onrender.com',
        },
    ];
}
