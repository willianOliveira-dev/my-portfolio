import {
  story_ai_description,
  story_ai_period,
  story_ai_title,
  story_beginning_description,
  story_beginning_period,
  story_beginning_title,
  story_fullstack_description,
  story_fullstack_period,
  story_fullstack_title,
  story_modern_description,
  story_modern_period,
  story_modern_title,
  story_web_description,
  story_web_period,
  story_web_title,
} from "@/paraglide/messages"
import type { Locale } from "@/paraglide/runtime"

import type { StoryMilestone } from "./story.types"

export function getStoryMilestones(
  locale: Locale
): readonly StoryMilestone[] {
  return [
    {
      id: "beginning",
      period: story_beginning_period({}, { locale }),
      title: story_beginning_title({}, { locale }),
      description: story_beginning_description({}, { locale }),
      technologies: ["C", "Python", "Git"],
    },
    {
      id: "web-foundations",
      period: story_web_period({}, { locale }),
      title: story_web_title({}, { locale }),
      description: story_web_description({}, { locale }),
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Sass",
        "Bootstrap",
        "Tailwind",
      ],
    },
    {
      id: "full-stack-transition",
      period: story_fullstack_period({}, { locale }),
      title: story_fullstack_title({}, { locale }),
      description: story_fullstack_description({}, { locale }),
      technologies: [
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
      ],
    },
    {
      id: "modern-stack",
      period: story_modern_period({}, { locale }),
      title: story_modern_title({}, { locale }),
      description: story_modern_description({}, { locale }),
      technologies: [
        "Next.js",
        "Fastify",
        "NestJS",
        "Drizzle",
        "Stripe",
        "Docker",
      ],
    },
    {
      id: "ai-and-beyond",
      period: story_ai_period({}, { locale }),
      title: story_ai_title({}, { locale }),
      description: story_ai_description({}, { locale }),
      technologies: [
        "AI SDK",
        "Claude",
        "Gemini",
        "RabbitMQ",
      ],
    },
  ]
}
